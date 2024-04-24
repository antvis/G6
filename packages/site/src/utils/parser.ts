import type { DocBlock, DocComment, DocSection } from '@microsoft/tsdoc';

/**
 *
 * @param tagName
 * @param docComment
 */
export function getBlockTagByName(tagName: string, docComment: DocComment): DocSection | undefined {
  const tag = docComment.customBlocks.find((customBlock: DocBlock) => customBlock.blockTag.tagName === tagName);
  return tag && tag.content;
}
