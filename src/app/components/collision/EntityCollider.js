export default class EntityCollider {
  constructor(entities) {
    this.entities = entities;
  }

  check(subject) {
    console.log('ok');
    // this.entities.forEach((candidate) => {
    //   if (subject === candidate) {
    //     return;
    //   }

    //   if (subject.bounds.overlaps(candidate.bounds)) {
    //     subject.collides(candidate);
    //     candidate.collides(subject);
    //   }
    // });
  }
}
