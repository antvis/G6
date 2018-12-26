const Behavior = {
  registerBehavior(name, behavior) {
    Behavior[name] = behavior;
    return this;
  },
  getBehavior(name) {
    return Behavior[name];
  },
  hasBehavior(name) {
    return !!Behavior[name];
  }
};

module.exports = Behavior;
