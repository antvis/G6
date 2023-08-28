> Referenced from https://dzone.com/articles/how-to-write-rfcs-for-open-source-projects

## Background/ Motivation:

In this chapter, we need to explain the background and motivation of this change and explain why this change should be made. According to different situations, the specific description should be slightly different according to specific situations. For example, when adding new functions, we should explain why the existing function cannot meet the requirements, what usage scenarios it would support and what the expected output is. In other situations when function reconfiguration and modification are needed, we should focus on explaining what problems exist in the existing implementation and what attempts have been made before.

## Detailed Description:

This chapter needs to specify how the project needs to be changed and also needs to be adjusted according to the specific requirements. Take Rust as an example; there are two main parts in this chapter: guide-level explanation and reference-level explanation.

### Guide-Level Explanation:

This chapter explains what changes this change will bring from the perspective of users, what new concepts have been introduced, and what new syntax has been added.

### Reference-Level Explanation:

This chapter explains how to implement the change from a technical point of view, how to interact with other features, and which edge cases need to be considered. Please remember not to paste too many detailed implementations in this chapter; a brief explanation of the ideas and some core code is enough. This way reviewer will have a better grasp of the macro design rather than get caught up in the implementation details.

## Basic Principles:

This chapter should explain why the change is implemented in this particular way.

Are there any other implementation schemes? What are the advantages and disadvantages of each, and what reasons drove us to adopt scheme A instead of scheme B? What is the existing technology? How are other projects realized, and what are their respective starting points?

## Unsolved Problems:

This chapter needs to explain the limitations of this change. For example, problems raised in the review but cannot be solved at present can be recorded in this chapter. Future possibilities This chapter is used to record the future possibilities of this change, which has been considered but has not been implemented this time.

Such as how a newly introduced feature can be combined with other features in the future. Or, when someone puts forward ideas beyond the scope of the current RFC during reviews, these ideas can be recorded in this chapter for future reference.
