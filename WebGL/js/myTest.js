(function (global, factory) {
    console.log(global)
    global.Person=factory()
}(this, function () {
        return function Person(name,age){
        this.name=name;
        this.age=age;
        this.getName=function(){
            return this.name;
        }
        
        this.setName=function(val){
            this.name=val;
        }
        
        this.getAge=function(){
            return this.age;
        }
    }
}));