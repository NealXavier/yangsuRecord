import * as _ from 'lodash'

const NUM = 45

console.log(_.chunk(2))

interface Cat{
  name:String,
  gender:String
}

function touchCat(cat:Cat){
  console.log('miao~',cat.name)
}

touchCat({
  name:'Tom',
  gender:'male'
})

