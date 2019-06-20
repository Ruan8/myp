import axios from 'axios'
axios.defaults.baseURL = "https://www.fi888.cn:5000"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
var instance = axios.create();
instance.defaults.timeout = 2500;
export async function index(){
    return await axios.get("/")
}
export async function list(url){
    return await axios.get("/list",{params:{ url }})
}
export async function getpic(url){
    return await axios.get("/getpic",{params:{ url }})
}
export async function search(name){
    return await axios.get("/search",{params:{ name }})
}
export async function tag(){
    return await axios.get("/tag")
}
export async function fl(tag,state,page){
    return await axios.get("/fl",{params:{ tag,state,page }})
}
export async function register(username,password){
    return await axios.post("/register",`username=${username}&password=${password}`)
}
export async function login(username,password){
    return await axios.post("/login",`username=${username}&password=${password}`)
}
export async function star(username){
    return await axios.post("/star",`username=${username}`)
}
export async function add_star(username,cartoon_name){
    return await axios.post("/add_star",`username=${username}&cartoon_name=${cartoon_name}`)
}
export async function del_star(username,cartoon_name){
    return await axios.post("/del_star",`username=${username}&cartoon_name=${cartoon_name}`)
}
export async function search_cartoon(cartoon_name){
    return await axios.get("/search_cartoon",{params:{ cartoon_name }})
}
export async function userform(username){
    return await axios.get("/userform",{params:{ username }})
}
export async function updateuserform(username,phonenum,sex){
    return await axios.get("/updateuserform",{params:{ username,phonenum,sex }})
}