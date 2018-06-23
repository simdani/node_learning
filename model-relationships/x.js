// Trade off between query performance vs consistency
// Using refrences (normalization) -> Consistency
let author = {
  name: "test"
}

let course = {
  author: 'author1',
  authors: [
    'id1',
    'id2'
  ]
}

// using embedded documents (denormalization) -> Performance
let course = {
  author: {
    name: 'test'
  }
}

// hybrid
let author = {
  name: 'test1'
}

let course = {
  author: {
    id: 'ref',
    name: 'test1'
  }
}