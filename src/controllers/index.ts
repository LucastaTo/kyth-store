
import { Request, Response } from "express";

const renderComingSoonPage = (_: Request, res: Response): void => {
    res.render("coming-soon/index");
  };

  const renderServerErrorPage = (_: Request, res: Response): void => {
    res.render("pages-500/index");
  };

  export default { renderComingSoonPage, renderServerErrorPage }