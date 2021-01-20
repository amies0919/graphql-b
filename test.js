const util = require('./util')

const { authorizeWithGithub } = require('./util.js')

const test = async()=>{
    let aaa = await authorizeWithGithub({
        client_id: 'f6faa786266f15ca6fa9',
        client_secret: 'e27e2c15ba8b55d5b098a6a880b009f3f9fba545',
        code: '4681d073f6265d892a7e'
    })
    console.log(aaa)
}
test()

