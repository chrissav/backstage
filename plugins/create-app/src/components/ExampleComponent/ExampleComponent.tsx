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

import React, { FC, useEffect, useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  pageTheme,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core';
import ExampleFetchComponent from '../ExampleFetchComponent';
import CreateAppForm from '../CreateAppForm';

const ExampleComponent: FC<{}> = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 4000);
    }
  }, [isSubmitting]);

  const onSubmit = () => {
    setIsSubmitting(true);
  };

  return (
    <Page theme={pageTheme.tool}>
      <Header title="Welcome to create-app!" subtitle="Create all the apps">
        <HeaderLabel label="Owner" value="chrissav" />
        <HeaderLabel label="Lifecycle" value="Beta" />
      </Header>
      <Content>
        <ContentHeader title="View and create apps">
          <SupportButton>Apps.</SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard title="Create a new app">
              <Typography variant="body1">
                <CreateAppForm onSubmit={onSubmit} submitting={isSubmitting} />
              </Typography>
            </InfoCard>
          </Grid>
          <Grid item>
            <ExampleFetchComponent />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};

export default ExampleComponent;
