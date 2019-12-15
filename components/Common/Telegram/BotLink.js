import { gfTelegram } from 'goldfish';

export const BotLink = () => {
  return (
    <a className="telegram-bot-link" href={gfTelegram.botHref}>
      {gfTelegram.botLinkText.en}
    </a>
  );
};