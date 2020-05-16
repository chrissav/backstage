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
import {
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { BackstageTheme } from '@backstage/theme';
import { Progress } from '@backstage/core';
// import Alert from '@material-ui/lab/Alert';
// import { useAsync } from 'react-use';
// import { ComponentIdValidators, ComponentIdAmiValidators } from '../../util/validate';

const useStyles = makeStyles<BackstageTheme>((theme) => ({
  form: {
    alignItems: 'flex-start',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  submit: {
    marginTop: theme.spacing(1),
  },
}));

type CreateAppProps = {
  onSubmit: () => any;
  submitting: boolean;
};

async function CreateApp(app_name = '') {
  // const { value, loading, error } = useAsync(async (): Promise<string> => {
  // const response = await fetch('https://yevq9fidgd.execute-api.us-west-2.amazonaws.com/Prod/create-app/');
  const response = await fetch('https://randomuser.me/api/?results=20', {
    method: 'POST',
    body: JSON.stringify({ app_name: app_name }),
  });
  const data = await response.json();
  console.log(data);
  return data;
}

const CreateAppForm: FC<CreateAppProps> = ({ onSubmit, submitting }) => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
  });
  const classes = useStyles();
  const hasErrors = !!errors.componentIdInput;
  const dirty = formState?.dirty;
  if (submitting) {
    CreateApp('create-example');

    return (
      <>
        <Typography variant="subtitle1" paragraph>
          Creating github repo...
        </Typography>
        <Progress />
      </>
    );
  }
  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={classes.form}
    >
      <FormControl>
        <TextField
          id="registerComponentInput"
          variant="outlined"
          label="app name"
          error={hasErrors}
          placeholder="git@github.com:chrissav/tf-example-app.git"
          name="appInput"
          required
          margin="normal"
          helperText="Enter the name of the app to create."
          inputRef={register({
            required: true,
            // validate: ComponentIdValidators,
          })}
        />

        {errors.componentIdInput && (
          <FormHelperText error={hasErrors} id="register-component-helper-text">
            {errors.appInput.message}
          </FormHelperText>
        )}
      </FormControl>
      <Button
        id="registerComponentFormSubmit"
        variant="contained"
        color="primary"
        type="submit"
        disabled={!dirty || hasErrors}
        className={classes.submit}
      >
        Submit
      </Button>
    </form>
  );
};

export default CreateAppForm;
