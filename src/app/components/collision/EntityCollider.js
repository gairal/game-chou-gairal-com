export default class EntityCollider {
  constructor(entities) {
    this.entities = entities;
  }

  check(subject) {
    this.entities.forEach((candidate) => {
    //   if (subject === candidate) {
    //     return;
    //   }

    //   console.log(candidate.name);

      // if (subject.bounds.overlaps(candidate.bounds)) {
      //   subject.collides(candidate);
      //   candidate.collides(subject);
      // }
    });
  }
}
