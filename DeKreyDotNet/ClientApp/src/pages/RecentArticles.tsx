import React from 'react';
import './RecentArticles.css';
import { MediumWidget } from '../components/MediumWidget';


export function RecentArticles() {
    return (
      <div className="RecentArticles">

        <h1>Recent Articles</h1>

        <MediumWidget url="https://medium.com/@matt.dekrey/a-better-git-branching-model-b3bc8b73e472"/>

      </div>
    );
}
