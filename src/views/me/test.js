
const a = 0;

if(a){
    console.log(a);
}else{
    console.log('a 未找到');
}

a ? console.log(a) : console.log('a 未找到');
a && console.log(a);

if(a && a==2){
    console.log(a);
}else{
    console.log('a 未找到');
}

a && a==2 ? console.log(a) : console.log('a 未找到');
a 
? a==2 ? console.log(a) : console.log('a 未找到')
: console.log('a 未找到');