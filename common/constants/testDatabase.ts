import News from "../types/news";

const newsData: News[] = [{
    title: "Game development contest!",
    content: "Join us in the battle to be the very best and build a distruptive game using core technology provided our enterprise sponser, one of mobile top selling game 'conquest shadow mythecal'.",
},
{
    title: "Art jam",
    content: "576B0",
}]

export const testDatabase: {[url: string]: any} = {
    "/news": newsData
};