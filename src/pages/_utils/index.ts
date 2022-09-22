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
  const minutesAfterPost = differenceInMinutes(
    new Date(),
    new Date(dateTimeString)
  );
  return { formatedDate, minutesAfterPost: `${minutesAfterPost} min` };
};

export { dateFormat, calcPostInfo };
