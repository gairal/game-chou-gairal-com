export default class EntityCollider {
  constructor(entities) {
    this.entities = entities;
  }

  check(subject) {
    if (!subject.hitable) return;
    this.entities.forEach((candidate) => {
      if (subject === candidate || !candidate.hitable) return;

      if (subject.overlaps(candidate)) {
        subject.collides(candidate);
        // TODO: this might be useful, not sure
        // candidate.collides(subject);
      }
    });
  }
}
