import Behavior from '../../../src/behavior'
describe('Behavior', () => {
  it('register behavior', () => {
    const behavior = new Behavior()
    behavior.registerBehavior('firset-behavior', {
      getEvents() {
        return {
          click: 'onClick'
        }
      },
      onClick(evt) {
        console.log('trigger click', evt)
      }
    });

    expect(behavior.hasBehavior('firset-behavior')).toEqual(true)
    expect(behavior.hasBehavior('test')).toEqual(false)
    // expect(behavior.getBehavior('firset-behavior')).toEqual('firset-behavior')
    console.log(behavior.getBehavior('firset-behavior'))
  })
})