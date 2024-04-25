import type { DocBlock, DocComment, DocSection } from '@microsoft/tsdoc';

/**
 * Get the block tag by name
 * @param tagName - The name of the block tag
 * @param docComment - The doc comment
 * @returns The block tag
 */
export function getBlockTagByName(tagName: string, docComment: DocComment): DocSection | undefined {
  const tag = docComment.customBlocks.find((customBlock: DocBlock) => customBlock.blockTag.tagName === tagName);
  return tag && tag.content;
}
