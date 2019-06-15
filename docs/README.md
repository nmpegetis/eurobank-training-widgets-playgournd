# Eurobank Training - Widgets Playground
> #### In this repository we are going step-by-step to create a storybook playground for the widgets of [eurobank's training application](https://github.com/nmpegetis/eurobank-training) 
> * [Step 0. Prerequisites](#0)  
> * [Step 1. Create a storybook for React components](#1)  
> * [Step 2. Add addons to a storybook for manipulating React components](#2)  
> * [Step 3. Add React component widgets that use the Material-UI library](#3)  
> * [Step 4. Add React component widgets that use the Ant Design library](#4)  
> * [Step 5. `Workshop` Create generators for columns and data for Table widget](#5)
> * [Step 6. *`Workshop solution`* for Table widget](#6)

<a name="0">

### Prerequisites
#### Overview React Documentation
* https://reactjs.org/docs/hello-world.html 

#### Overview about npm and package.json
> <strong>Useful links:</strong>
> * https://www.npmjs.com/what-is-npm
> * https://docs.npmjs.com/about-npm/
> * https://www.w3schools.com/whatis/whatis_npm.asp

<a name="1">

### 1. Create a storybook for React components  
#### Let's start coding
Create a new package where we are going to create the widgets playground
```sh
npm init 
```
Our 1<sup>st</sup> task is to create a storybook to easily preview and interact with React components  
> <strong>Useful links:</strong>
> * https://storybook.js.org/
> * https://storybook.js.org/docs/guides/quick-start-guide/
  
```sh
  npx -p @storybook/cli sb init --type react
  npm install react react-dom --save
  npm install babel-loader @babel/core --save-dev 
```

Open `package.json` and append `scripts` entry
```
...

{
  "scripts": {
    "storybook": "start-storybook"
  }
}

...
```

Create a storybook config file `.storybook/config`:
```sh
mkdir .storybook && touch .storybook/config.js 
```  
and fill in:
```javascript
import { configure } from '@storybook/react';
function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}
configure(loadStories, module);
```
then create a `stories` directory with `index.js` inside
```sh
mkdir stories && touch stories/index.js
```
and fill in:

```javascript
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';

storiesOf('Button', module)
  .add('with text', () => {
    const style = {
    backgroundColor: '#FFF',
    border: '1px solid #DDD',
    borderRadius: 2,
    outline: 0,
    fontSize: 15,
    cursor: 'pointer',
  };
    return (<Button>Hello Button</Button>)
  })
  .add('with emoji', () => (
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ));   
```

That's it! You are done!
Run
```sh
npm run storybook
```

In order to checkout the checkpoint branch `storybook-starter` you may:

`git checkout storybook-starter`

---
<a name="2">

#### Step 2. Add addons to a storybook for manipulating React components

Our 2<sup>nd</sup> task is to use addons in storybook 

Firstly we need to install addons packages that we are going to use:
```sh
npm i -D @storybook/addons @storybook/addon-actions @storybook/addon-knobs @storybook/addon-notes (adds notes for components, knobs, actions)
touch .storybook/addons.js
```

then create file `.storybook/addons.js` and fill in with the following imports:

```javascript 
import '@storybook/addon-actions/register';
import '@storybook/addon-knobs/register';
import '@storybook/addon-notes/register';
```
Finally, edit `stories/index.js` to use addons:

```javascript
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';

  storiesOf('Button', module)
  	.addDecorator(withKnobs)
    .add('with text', () => {
      const style = {
        backgroundColor: '#FFF',
        border: '1px solid purple',
        borderRadius: 2,
        outline: 0,
        fontSize: 15,
        cursor: 'pointer',
      };
      const name = text('Name', 'Click me!');

      return (
        <button
          disabled={boolean('Disabled', false)}
          style={object('style', style)}
          onClick={action('clicked')}
        >
          {name}
        </button>
      );
    },
    { notes: 'A very simple button component'}
  )
	.add('with emoji', () => (
		<button>
			<span role="img" aria-label="so cool">
				😀 😎 👍 💯
			</span>
		</button>
	));
```
> <strong>Useful links:</strong>
>	* https://storybooks-official.netlify.com/?path=/story/addons-knobs-withknobs--tweaks-static-values
>	* https://storybook.js.org/docs/addons/addon-gallery/

Run storybook to see the results
```sh
npm run storybook
```
In order to checkout the checkpoint branch `storybook-addons` you may:

`git checkout storybook-addons`

---
<a name="3"></a>

#### Step 3. Add React component widgets that use the Material-UI library

Our 3<sup>rd</sup> task is to use Material-UI components in storybook 

> <strong>Useful links:</strong>
> * https://material-ui.com/

Install `material-ui` packages
```sh
npm i @material-ui/core @material-ui/icons @material-ui/styles
```

> `Hands on button creation`

Use Material-UI to create the widgets for our [application](https://github.com/nmpegetis/eurobank-training)
###### Button:
`stories/index.js`
```javascript
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import Button from '@material-ui/core/Button';

storiesOf('Button', module)
	.addDecorator(withKnobs)
	.add(
		'with text',
		() => {
			const name = text('Name', 'Click me!');
			const colors = {
				primary: 'primary',
				secondary: 'secondary',
			};
			const color = select('Color', colors, colors.primary);

			return (
				<Button
					disabled={boolean('Disabled', false)}
					variant="contained"
					color={color}
					onClick={action('clicked')}
				>
					{name}
				</Button>
			);
		},
		{ notes: 'A very simple button component' }
	)
	.add('with emoji', () => (
		<Button>
			<span role="img" aria-label="so cool">
				😀 😎 👍 💯
			</span>
		</Button>
	));
```

###### TextField:
`stories/index.js`
```javascript
...

storiesOf('Field', module).addDecorator(withKnobs).add('TextField', () => {
	const name = text('Name', 'Label');
	let value = text('Value', 'Cat in the Hat');
	const handleChange = (e) => console.log('e', e.target.value);
	return (
		<TextField
			id="standard-name"
			label={name}
			disabled={boolean('Disabled', false)}
			value={value}
			onChange={action('TextField changed')}
			margin="normal"
		/>
	);
}, { notes: 'A very simple textField component' });
```

###### SelectField:
`stories/index.js`
```javascript
...

storiesOf('Select', module).addDecorator(withKnobs).add('SelectField', () => {
	const name = text('Label', 'Age');
	const items = { None: '', Ten: 10, Twenty: 20, Thirty: 30 };
	const value = select('Value', items, '');

	const renderMenuItems = () => Object.keys(items).map((key) => <MenuItem value={items[key]}>{key}</MenuItem>);

	return (
		<FormControl>
			<InputLabel htmlFor="age-simple">{name}</InputLabel>
			<Select
				disabled={boolean('Disabled', false)}
				value={value}
				onChange={action('SelectField changed')}
				style={{ width: '150px' }}
			>
				{renderMenuItems()}
			</Select>
		</FormControl>
	);
}, { notes: 'A very simple selectField component' });
```

###### DatePicker:
`stories/index.js`

Install requisite packages first:
```sh
npm i @material-ui/pickers @date-io/date-fns date-fns@next
```

> <strong>Useful links:</strong>
> * https://material-ui-pickers.dev/

```javascript
...

import { withKnobs, date, text, boolean, select } from '@storybook/addon-knobs';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

...

storiesOf('Pickers', module).addDecorator(withKnobs).add('Date', () => {
	const name = text('Label', 'Date');
	let selectedDate = date('Date', new Date('2014-08-18T21:11:54'));

	const handleDateChange = (date) => {
		selectedDate = new Date(date);
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Grid
				container
				style={{
					grid: {
						width: '60%',
					},
				}}
			>
				<KeyboardDatePicker
					margin="normal"
					label={name}
					value={selectedDate}
					onChange={handleDateChange}
					disabled={boolean('Disabled', false)}
				/>
			</Grid>
		</MuiPickersUtilsProvider>
	);
}, { notes: 'A very simple DatePicker component' });
```

That's it! You are done!
Run
```sh
npm run storybook
```

In order to checkout the checkpoint branch `storybook-material-ui` you may:

`git checkout storybook-material-ui`

---
<a name="4"></a>

#### Step 4. Add React component widgets that use the Ant Design library 

Our 4<sup>th</sup> task is to use Ant Design components in storybook 


> <strong>Useful links:</strong>
> * https://ant.design

Install `antd` package 
```sh
npm i antd
```

> `Hands on table creation`

###### Table:
check `stories/index.js` for code

Run storybook to see the results
```sh
npm run storybook
```
In order to checkout the checkpoint branch `storybook-antd-init` you may:

`git checkout storybook-antd-init`

---

<a name="5"></a>

#### Step 5. `Workshop` Create generators for columns and data for Table widget

Our 5<sup>th</sup> task is to work together in creating data and columns for table 

> <strong>Useful links:</strong>
> * code snippets used:
>	* https://stackoverflow.com/a/5511591/1995605
>	* https://stackoverflow.com/a/4550514/1995605

> ## Workshop
> checkout the checkpoint branch 
> `storybook-antd-workshop`. There there is some **//TODO** code for you to append. In class, append this code with the instructor
> To checkout the branch you can:
> * `git checkout storybook-antd-workshop`

---

<a name="6"></a>

#### Step 6. *`Workshop solution`* for Table widget

The final solution of the above workshop follows below:

###### Table:
`stories/index.js`
```javascript
...

import { withKnobs, date, text, boolean, select, object } from '@storybook/addon-knobs';
import { Table, Divider, Tag } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

...

storiesOf('Widgets', module).addDecorator(withKnobs).add('Table', () => {
	const chooseDaysBefore = (days) =>
		((d) => new Date(d.setDate(d.getDate() - days)))(new Date()).toLocaleDateString();
	const chooseDaysAfter = (days) => ((d) => new Date(d.setDate(d.getDate() + days)))(new Date()).toLocaleDateString();

	const unit = [ 'Centralized Services & Digital Branches' ];
	const pem = [ '10000', '10001', '10010', '10011' ];
	const title = [ 'Lifemoments', 'PricingTool', 'LendingTool', 'WizardTool' ];
	const desc = [ 'test', 'test2', 'test3' ];
	const supervisor = [ 'Super1', 'Super2', 'Super3' ];
	const team = [
		[ 'Member1', 'Member2', 'Member3' ],
		[ 'Member4', 'Member5', 'Member6', 'Member7' ],
		[ 'Member8', 'Member9' ],
		[ 'Member10' ],
	];
	const startingDate = [ chooseDaysBefore(10), chooseDaysBefore(32), chooseDaysBefore(15), chooseDaysBefore(45) ];
	const endingDate = [ chooseDaysAfter(40), chooseDaysAfter(60), chooseDaysAfter(50), chooseDaysAfter(4) ];
	const comments = [
		'nothing to mention',
		'low team capacity due to holiday season',
		'many experienced developers in team',
	];
	const mandays = [ 100, 140, 150 ];
	const lastUpdate = [ chooseDaysBefore(3), chooseDaysBefore(1), chooseDaysBefore(0), , chooseDaysBefore(6) ];
	const status = [ 'Started', 'On going', 'Finishing' ];

	const projectStatusData = () => ({
		unit: unit[Math.floor(Math.random() * unit.length)],
		pem: pem[Math.floor(Math.random() * pem.length)],
		title: title[Math.floor(Math.random() * title.length)],
		desc: desc[Math.floor(Math.random() * desc.length)],
		supervisor: supervisor[Math.floor(Math.random() * supervisor.length)],
		team: team[Math.floor(Math.random() * team.length)],
		startingDate: startingDate[Math.floor(Math.random() * startingDate.length)],
		endingDate: endingDate[Math.floor(Math.random() * endingDate.length)],
		comments: comments[Math.floor(Math.random() * comments.length)],
		mandays: mandays[Math.floor(Math.random() * mandays.length)],
		lastUpdate: lastUpdate[Math.floor(Math.random() * lastUpdate.length)],
		status: status[Math.floor(Math.random() * status.length)],
	});

	const data = [ ...Array(4).keys() ].map(() => projectStatusData());

	const columns = Object.keys(projectStatusData()).map((key) => ({
		title: key.toUpperCase(),
		dataIndex: key,
		key: key,
		render: (inputElement) =>
			key === 'unit' ? (
				<a href="javascript:;">{inputElement}</a>
			) : key === 'team' ? (
				<span>
					{inputElement.map((tag) => {
						return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
					})}
				</span>
			) : key === 'status' ? (
				<span>
					<Tag
						color={
							inputElement === 'Started' ? 'green' : inputElement === 'On going' ? 'geekblue' : 'volcano'
						}
						key={inputElement}
					>
						{inputElement.toUpperCase()}
					</Tag>
				</span>
			) : (
				inputElement
			),
	}));

	const newProjectData = {
		unit: 'Centralized Services & Digital Branches',
		pem: '10100',
		title: 'Financial Terminal',
		desc: 'test4',
		supervisor: 'Super2',
		team: [ 'Member11', 'Member12', 'Member13' ],
		startingDate: chooseDaysBefore(0),
		endingDate: chooseDaysAfter(400),
		comments: 'fingers crossed',
		mandays: 900,
		lastUpdate: chooseDaysBefore(0),
		status: 'Started',
	};
	const newRow = object(name, newProjectData);

	return <Table columns={columns} dataSource={[ ...data, newRow ]} />;
}, { notes: 'A very simple Table component' });
```

Run storybook to see the results
```sh
npm run storybook
```
In order to checkout the checkpoint branch `storybook-antd` you may:

`git checkout storybook-antd`

---


## *That's it! You are done!*

> #### Let's continue. [ProjectStatus App creation](https://github.com/nmpegetis/eurobank-training)
> Prerequisites:
> * introduction to [CRA](https://facebook.github.io/create-react-app/docs/getting-started)
> * you should switch to a diffenent  directory than this one
> * check repository [eurobank-training]((https://github.com/nmpegetis/eurobank-training))

