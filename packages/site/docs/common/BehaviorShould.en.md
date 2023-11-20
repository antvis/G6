<embed src="./BehaviorShouldBegin.en.md"></embed>

## shouldUpdate

**Type**: `(event: IG6GraphEvent) => boolean;`

<embed src="./IG6GraphEvent.en.md"></embed>

**Default**: `() => true`

**Required**: false

Whether to allow the current node to update the interaction state. When false is returned, you need to manually listen for events and update the state
