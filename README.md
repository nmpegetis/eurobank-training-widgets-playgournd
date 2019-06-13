## Overview React Documentation
* https://reactjs.org/docs/hello-world.html 

## Overview about npm and package.json
* https://www.npmjs.com/what-is-npm
* https://docs.npmjs.com/about-npm/
* https://www.w3schools.com/whatis/whatis_npm.asp

## Let's start coding
* npm init 
  * starts a project package

#### 1. Our first task is to create a storybook to easily preview and interact with React components  
* https://storybook.js.org/
* https://storybook.js.org/docs/guides/quick-start-guide/
  
```
  npx -p @storybook/cli sb init --type react
  npm install react react-dom --save
  npm install babel-loader @babel/core --save-dev 
```
* npm script
`{
  "scripts": {
    "storybook": "start-storybook"
  }
}`

* Create storybook config file
  * mkdir .storybook && touch .storybook/config.js 
  
```javascript
import { configure } from '@storybook/react';
function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}
configure(loadStories, module);
```
* _
  * mkdir stories && touch stories/index.js
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
* _
  * npm run storybook

`branch: storybook-starter`

---

#### 2. Our 2nd task is to use addons in storybook 
```
npm i -D @storybook/addons @storybook/addon-actions @storybook/addon-knobs @storybook/addon-notes (adds notes for components, knobs, actions)
touch .storybook/addons.js
```

* add in .storybook/addons.js the following imports

```javascript 
import '@storybook/addon-actions/register';
import '@storybook/addon-knobs/register';
import '@storybook/addon-notes/register';
```
* add in stories/index.js

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
* for more info on addons visit: 
	* https://storybooks-official.netlify.com/?path=/story/addons-knobs-withknobs--tweaks-static-values
	* https://storybook.js.org/docs/addons/addon-gallery/



```
npm run storybook
```
`branch: storybook-addons`

---

#### 3. Our 3rd task is to use Material-UI components in storybook 

* https://material-ui.com/
```
npm i @material-ui/core @material-ui/icons @material-ui/styles
```

> `Hands on button creation`

###### Button:
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
```
npm i @material-ui/pickers @date-io/date-fns date-fns@next
```
* https://material-ui-pickers.dev/

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
```
npm run storybook
```

`branch: storybook-material-ui`

---

#### 4. Our 4th task is to use Ant Design components in storybook 

* https://ant.design
```
npm i antd
```

> `Hands on table creation`

###### Table:

`branch: storybook-antd-init`

---
#### 5. Our 5th task is to work together in creating data and columns for table 
* code snippets used
	* https://stackoverflow.com/a/5511591/1995605
	* https://stackoverflow.com/a/4550514/1995605

`branch: storybook-antd-workshop`

---

###### Solution 
```javascript
...

import { withKnobs, date, text, boolean, select, object } from '@storybook/addon-knobs';
import { Table, Divider, Tag } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

...

storiesOf('Components', module).addDecorator(withKnobs).add('Table', () => {
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

`branch: storybook-antd`

---

#### Let's continue. ProjectStatus App creation

* introduction to CRA
* switch to another directory
* https://facebook.github.io/create-react-app/docs/getting-started
* check repository eurobank-projectstatus

