import { differenceInMinutes, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type TDateFormat = (dateTimeString: string) => string;

const dateFormat: TDateFormat = (dateTimeString) => {
  const formatedDate = format(new Date(dateTimeString), 'd LLL yyyy', {
    locale: ptBR,
  });
  return formatedDate;
};

type TCalcPostInfo = (dateTime: string) => {
  formatedDate: string;
  minutesAfterPost: string;
};

const calcPostInfo: TCalcPostInfo = (dateTimeString) => {
  const formatedDate = dateFormat(dateTimeString);
  const minutesAfterPost = differenceInMinutes(new Date(), new Date(dateTimeString));
  return { formatedDate, minutesAfterPost: `${minutesAfterPost} min` };
};

interface post {
  body: { text: string }[];
}
type TCalcPostReadTime = (postParagraphList: post[]) => number;
const calcPostReadTime: TCalcPostReadTime = (postParagraphList) => {
  const wordCount = postParagraphList.reduce(
    (p, c) => p + c.body.reduce((pr, cu) => pr + cu.text.match(/(\w+)/g).length, 0),
    0
  );

  const postReadTimeInMinutes = Math.ceil(wordCount / 200);

  return postReadTimeInMinutes;
};

export { dateFormat, calcPostInfo, calcPostReadTime };
