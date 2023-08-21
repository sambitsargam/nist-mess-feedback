import { addDoc, doc, updateDoc } from "firebase/firestore";
import { collection, db, getDocs } from "../firebase";
import { quizData } from "../pages/Question/quiz.model";

export const addScoreToUser = async (scoreValue: number, userInfo: any) => {
  const quizId = sessionStorage.getItem("quizId");
  const quizCategory = quizData.find((quizObj) => quizObj.id === quizId)?.category;
  const scoreRef = collection(db, "scoreboard");
  const scoreData = await getDocs(scoreRef);
  let leaderData: any = {}

  scoreData.docs.forEach((doc) => {
    const { quizId: QuizID, email } = doc.data()
    if (QuizID.toString() === quizId && userInfo.email === email.toString()) {
      leaderData = {
        docId: doc.id,
        data: doc.data()
      }
    }
  });

  if (leaderData?.docId) {
    const leaderRef = doc(db, "scoreboard", leaderData?.docId);
    await updateDoc(leaderRef, {
      score: scoreValue
    });
  } else {
    await addDoc(collection(db, "scoreboard"), {
      username: userInfo.name,
      email: userInfo.email,
      quizId: quizId,
      quizCategory: quizCategory,
      score: scoreValue
    });
  }
};
