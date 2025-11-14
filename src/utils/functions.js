import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  limit,
  query,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

const tasksCollectionRef = collection(db, "tasks");

export async function addTaskDB(task) {
  try {
    // eslint-disable-next-line no-unused-vars
    const documentRef = await addDoc(tasksCollectionRef, {
      text: task,
      completed: false,
      createdAt: Date.now(),
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: `${error.message}` };
  }
}

export async function fetchTasksDB() {
  try {
    const firstPageQuery = query(
      tasksCollectionRef,
      orderBy("createdAt"),
      limit(3)
    );
    const firstPageSnapshot = await getDocs(firstPageQuery);
    const tasks = firstPageSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const lasDoc = firstPageSnapshot.docs[firstPageSnapshot.docs.length - 1];
    return { success: true, data: tasks, lastdoc: lasDoc };
  } catch (error) {
    return { success: false, error: `${error.message}` };
  }
}

export async function fetchNextTasksDB(lastdoc) {
  if (!lastdoc) {
    return { success: false, error: "Cannot determine last document" };
  }
  try {
    console.log("Last doc =>>", lastdoc);

    const nextPageQuery = query(
      tasksCollectionRef,
      orderBy("createdAt"),
      startAfter(lastdoc),
      limit(3)
    );

    const nextPageSnapshot = await getDocs(nextPageQuery);
    const tasks = nextPageSnapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
    const nextLastDoc = nextPageSnapshot.docs[nextPageSnapshot.docs.length - 1];
    //   console.log("next page snapshot", tasks);

    return { success: true, data: tasks, nextLastDoc: nextLastDoc };
  } catch (error) {
    return { success: false, error: `Error ${error}` };
  }
}

export async function deleteTaskDB(task) {
  console.log("to be deleted", task);

  try {
    const taskDoc = doc(tasksCollectionRef, task.id);
    await deleteDoc(taskDoc);

    return { success: true };
  } catch (error) {
    return { success: false, error: `${error.message}` };
  }
}

export async function updateTaskDB(task, id) {
  try {
    const taskDoc = doc(tasksCollectionRef, id);
    await updateDoc(taskDoc, { text: task });

    return { success: true };
  } catch (error) {
    console.error(error);
  }
}
