/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC } from 'react';
import { Table, TableColumn, Progress } from '@backstage/core';
import Alert from '@material-ui/lab/Alert';
import { useAsync } from 'react-use';

type Repo = {
  name: string;
  owner: {
    login: string;
    url: string;
  };
  description: string;
  language: string;
  license: {
    key: string;
    name: string;
  };
};

type DenseTableProps = {
  repos: Repo[];
};

export const DenseTable: FC<DenseTableProps> = ({ repos }) => {
  const columns: TableColumn[] = [
    { title: 'Name', field: 'name' },
    { title: 'Owner', field: 'owner' },
    { title: 'Description', field: 'description' },
    { title: 'Language', field: 'language' },
  ];

  const data = repos.map((repo) => {
    return {
      name: repo.name,
      owner: repo.owner.login,
      description: repo.description,
      language: repo.language,
    };
  });

  return (
    <Table
      title="Connected Github Repos (fetching data from github/chrissav)"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

const ExampleFetchComponent: FC<{}> = () => {
  const { value, loading, error } = useAsync(async (): Promise<Repo[]> => {
    const response = await fetch(
      'https://yevq9fidgd.execute-api.us-west-2.amazonaws.com/Prod/create-app/',
    );
    // use this as temporary to not incur costs
    // const response = await fetch('https://randomuser.me/api/?results=20');
    const data = await response.json();
    console.log(data);
    return data.message;
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    console.log(error);
    return <Alert severity="error">{error.message}</Alert>;
  }

  return <DenseTable repos={value || []} />;
};

export default ExampleFetchComponent;
