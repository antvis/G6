/**
 * @param {Object} param
 * @param {import('@actions/core')} param.core
 * @param {ReturnType<import('@actions/github').getOctokit>} param.github
 * @param {import('@actions/github').context} param.context
 */
module.exports = async ({ core, github, context }) => {
  try {
    const owner = context.repo.owner;
    const repo = context.repo.repo;

    const label = 'resolved pending release';
    const resolvedLabel = 'resolved';

    const issuesPendingRelease = (
      await github.paginate(github.rest.issues.listForRepo, {
        owner,
        repo,
        state: 'open',
        per_page: 100,
      })
    ).filter((i) => i.pull_request === undefined && i.labels.map((l) => l.name).includes(label));

    let failedIssues = 0;

    for (const issue of issuesPendingRelease) {
      const number = issue.number;

      // slow down how often we send requests if there are lots of issues.
      await new Promise((resolve) => setTimeout(resolve, 250));

      const { data: releases } = await github.rest.repos.listReleases({
        owner,
        repo,
      });
      const release = releases.length > 0 ? releases[0] : undefined;

      if (release === undefined) {
        throw new Error('There is no release available');
      }

      const message = `:tada: This issue has been resolved and is now available in the [${release.tag_name}](${release.html_url}) release! :tada:`;

      try {
        // Remove the `resolved pending release` label.
        await github.rest.issues.removeLabel({
          owner,
          repo,
          issue_number: number,
          name: label,
        });

        // Add the `resolved` label.
        await github.rest.issues.addLabels({
          owner,
          repo,
          issue_number: number,
          labels: [resolvedLabel],
        });

        // Comment on the issue that we will close.
        await github.rest.issues.createComment({
          owner,
          repo,
          issue_number: number,
          body: message,
        });

        // Close the issue.
        await github.rest.issues.update({
          owner,
          repo,
          issue_number: number,
          state: 'closed',
        });
      } catch (error) {
        console.error(`Failed to comment on and/or close issue #${number}`, error);
        failedIssues++;
      }

      console.log(`Closed #${number}`);
    }

    if (failedIssues > 0) {
      core.setFailed(`Failed to comment on ${failedIssues} PRs`);
    }
  } catch (error) {
    console.error(error);
    core.setFailed(error.message);
  }
};
