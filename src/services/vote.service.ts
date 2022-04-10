import { VoteDB } from "../db/vote.DB";
import { Vote } from "../entities/Vote";
import { User } from "../entities/User";
import { UserService } from "./user.service";
import { AnswerDB } from "../db/answer.DB";
import { Question } from "../entities/Question";
import { QuestionService } from "./question.service";
import { Answer } from "../entities/Answer";
import { AnswerService } from "./answer.service";

export class VoteService {

    private vDataBase = new VoteDB();

    async createVote(vote: Vote, user: User) {
        //TODO check if the user can vote on this item
        vote.userId = user.userId;

        if (vote.itemType == 'question') {
            //Get the question from the db
            const question = new Question();
            question.questionId = vote.itemId;
            const item = await new QuestionService().getQuestion(question);
            //if the question exists do the vote
            if (item != undefined) {
                const questionOwner = new User();
                questionOwner.userId = item.userId;

                if (vote.voteType == 'up') {
                    await new QuestionService().updateQuestionPoints(item, +1);
                    await new UserService().updateUserPoints(questionOwner, +5);

                } else {
                    await new UserService().updateUserPoints(user, -1);
                    await new UserService().updateUserPoints(questionOwner, -2);
                }
            } else {
                throw new Error("Question does not exist");
            }
        } else {
            //Get the answer from the db
            const answer = new Answer();
            answer.answerId = vote.itemId;
            const item = await new AnswerDB().getAnswer(answer);
            //if the answer exists do the vote
            if (item != undefined) {
                const answerOwner = new User();
                answerOwner.userId = item.userId;

                if (vote.voteType == 'up') {
                    await new AnswerService().updateAnswerPoints(item, +1);
                    await new UserService().updateUserPoints(answerOwner, +10);

                } else {
                    await new AnswerService().updateAnswerPoints(item, -1);
                    await new UserService().updateUserPoints(user, -1);
                    await new UserService().updateUserPoints(answerOwner, -2);
                }
            } else {
                throw new Error("Answer does not exist");
            }
        }
        //add vote to db
        return await this.vDataBase.addVote(vote);
    }

    async deleteVote(vote: Vote, user: User) {
        const itemToDelete = await this.vDataBase.getVote(vote);

        if (itemToDelete == undefined) {
            throw new Error("Vote does not exist");
        }

        if (user.type == "Admin" || itemToDelete.userId == user.userId) {

            vote.userId = user.userId;

            if (vote.itemType == 'question') {
                //Get the question from the db
                const question = new Question();
                question.questionId = vote.itemId;
                const item = await new QuestionService().getQuestion(question);
                //if the question exists do the vote
                if (item != undefined) {
                    const questionOwner = new User();
                    questionOwner.userId = item.userId;

                    if (vote.voteType == 'up') {
                        await new QuestionService().updateQuestionPoints(item, -1);
                        await new UserService().updateUserPoints(questionOwner, -5);

                    } else {
                        await new UserService().updateUserPoints(user, +1);
                        await new UserService().updateUserPoints(questionOwner, +2);
                    }
                } else {
                    throw new Error("Question does not exist");
                }
            } else {
                //Get the answer from the db
                const answer = new Answer();
                answer.answerId = vote.itemId;
                const item = await new AnswerDB().getAnswer(answer);
                //if the answer exists do the vote
                if (item != undefined) {
                    const answerOwner = new User();
                    answerOwner.userId = item.userId;

                    if (vote.voteType == 'up') {
                        await new AnswerService().updateAnswerPoints(item, -1);
                        await new UserService().updateUserPoints(answerOwner, -10);

                    } else {
                        await new AnswerService().updateAnswerPoints(item, +1);
                        await new UserService().updateUserPoints(user, +1);
                        await new UserService().updateUserPoints(answerOwner, +2);
                    }
                } else {
                    throw new Error("Answer does not exist");
                }
            }
            return await this.vDataBase.deleteVote(itemToDelete);
        }

        throw new Error("User does not have access rights");
    }

    async getVote(vote: Vote) {
        return await this.vDataBase.getVote(vote);
    }

    async getVotes(vote: Vote) {
        return await this.vDataBase.getVotes(vote);
    }

    async updateVote(vote: Vote, user: User) {
        const itemToUpdate = await this.vDataBase.getVote({ voteId: vote.voteId });

        if (itemToUpdate == undefined) {
            throw new Error("Vote does not exist");
        }

        if (user.type == "Admin" || itemToUpdate.userId == user.userId) {

            if (vote.itemType != undefined) {
                itemToUpdate.itemType = vote.itemType;
            }
            if (vote.voteType != undefined) {
                itemToUpdate.voteType = vote.voteType;
            }
            if (vote.userId != undefined) {
                itemToUpdate.userId = vote.userId;
            }
            if (vote.itemId != undefined) {
                itemToUpdate.itemId = vote.itemId;
            }

            return await this.vDataBase.updateVote(itemToUpdate);
        }

        throw new Error("User does not have access rights");

    }

    toVote(obj: any): Vote {
        const vote = new Vote();

        if (obj.itemId != undefined) {
            vote.itemId = obj.itemId;
        }

        if (obj.itemType != undefined) {
            vote.itemType = obj.itemType;
        }

        if (obj.userId != undefined) {
            vote.userId = obj.userId;
        }

        if (obj.voteId != undefined) {
            vote.voteId = obj.voteId;
        }

        if (obj.voteType != undefined) {
            vote.voteType = obj.voteType;
        }

        return vote;
    }
}