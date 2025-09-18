import { collection,addDoc,getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { db } from "./firebase";


const tasksCollectionRef=collection(db,"tasks");

export async function addTaskDB(task) {
    try {

        // eslint-disable-next-line no-unused-vars
        const documentRef = await addDoc(tasksCollectionRef,{
            text:task,
            completed:false
        })

        return {success:true}

    } catch (error) {
        return {success:false,error:`${error.message}`}
    }
}

export async function fetchTasksDB(){
    try {

        const documentRef = await getDocs(tasksCollectionRef)
        const tasks = documentRef.docs.map((doc)=>({...doc.data(),id:doc.id}))
        return {success:true,tasks}

        

    } catch (error) {
        return {success:false,error:`${error.message}`}
    }
}



export async function deleteTaskDB(task){
    console.log('to be deleted',task);
    
    try {
        const taskDoc = doc(tasksCollectionRef,task.id)
        await deleteDoc(taskDoc)

        return {success:true}

    } catch (error) {
        return {success:false,error:`${error.message}`}
    }

}



export async function updateTaskDB(task,id){
    try {
        const taskDoc = doc(tasksCollectionRef,id)
        await updateDoc(taskDoc,{text:task})

        return {success:true}
    } catch (error) {
        console.error(error);
        
    }

}

