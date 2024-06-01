export function assert(ok, msg="Assertion failed"){
    if(!ok) throw new Error(msg)
}
export function assertVal(ok_predicate,get_msg){
    return value=>{
        assert(ok_predicate(value),get_msg(value))
        return value;
    }
}
// export const assertValIsNotNull = (value,msg = "Assertion failed. Not null expected") => assertVal(value,value=>value!=null,()=>msg)
export const assertValIsNotNull = (msg) => assertVal(value=>value!=null,()=>msg)
