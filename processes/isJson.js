export default function isJson (item) {
    item = typeof item !== 'string' ? JSON.stringify(item) : item ;
    try{
        item = JSON.parse(item);
    } catch (e) {
        return false
    }
    if((typeof item === 'object' || Array.isArray(item)) && item !== null){
        return item
    }
}