import React from 'react';
import './RecentArticles.css';
import * as dateFns from "date-fns";
import { articles, } from "../articles";
import { Article } from '../articles/article';
import { Card, PaddedContainer } from '../components/Container';


export function RecentArticles() {
  const sorted = articles.map(_ => _).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="RecentArticles">

      <h1>Recent Articles</h1>

      <section className="articleGrid">
        {sorted.map(article => <ArticleCard key={article.url} article={article} />)}
      </section>

    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <a href={article.url} className="CardLink">
      <Card className="ArticleCard">
        <div style={{ backgroundImage: `url(${article.image})` }} className="image"></div>
        <PaddedContainer className="textContent">
          <span className="title">
            {article.title}
          </span>
          <span className="date">{dateFns.format(article.date, "MMMM D, YYYY")}</span>
        </PaddedContainer>
      </Card>
    </a>
  )
}