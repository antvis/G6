<embed src="./BehaviorShouldBegin.en.md"></embed>

## shouldUpdate

**Type**:

```ts
type shouldUpdate = (event: IG6GraphEvent) => boolean;
```

**Default**: `() => true`

**Required**: false

**Description**: Whether to allow the current node to update the interaction state. When false is returned, you need to manually listen for events and update the state

<embed src="./IG6GraphEvent.en.md"></embed>
