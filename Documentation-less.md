# Spartan Grid Documentation

- [Basic Usage](#basic-usage)
- [Advanced Usage](#advanced-usage)
	- [Grid Creation API](#grid-creation-api)
	- [Viewport Dependent Grids](#viewport-dependent-grids)
	- [Custom Classes](#custom-classes)
- [Semantic Grid](#semantic-grid)
- [Responsive Approaches](#responsive-approaches)
	- [The "Spartan Way"](#the-spartan-way)
	- [The "Twitter Bootstrap Way"](#the-twitter-bootstrap-way)

## Basic Usage

All about basic usage of Spartan is documented in the [project readme](https://github.com/SimonHarte/SpartanGrid/blob/master/README.md#basic-usage).

## Advanced Usage

### Grid Creation API

You would normally just use `.grid-bundle()` to set up a grid, but you can also use the following mixins to generate even more flexible grids in [LessCSS scopes](http://lesscss.org/features/#features-overview-feature-scope), see [Viewport Dependent Grids](#viewport-dependent-grids) and [Custom Classes](#custom-classes) for use cases.

#### `grid-core([@ns: ''], [@generate: true])`

This will define the core variables and mixins and generate selectors and styles needed for any grid setup, e.g. clearing on the row, float of columns etc. Generally has to be called only once for any grid setup.

> [Read about namespacing](#namespace)

**Unlocks**

- `.grid-row()`
- `.grid-col()`

**Generates**

- `.g-row`
- `.g-col`


If you use the grid only with [semantic selectors](#semantic-grid) you can optionally omit generation of core selectors.

```less
// unlock core variables and mixins without generating css
.grid-core(@generate: false);
```

#### `grid-unlock(<@config>)`

Pass in your grid configuration as a list object like with [`.grid-bundle()`](https://github.com/SimonHarte/SpartanGrid/blob/master/README.md#grid-setup). This will unlock all the grid mixins using your configuration within the current scope (or globally).

```less
#my-scope {
	.grid-unlock(@config-list);
	
	.custom-column {
		.grid-span(5);
	}
}
```

**Unlocks**

- `.grid-span()`
- `.grid-offset()`
- `.grid-push()`
- `.grid-pull()`
- `.grid-reorder()`
- `.grid-col-set()`
- `.grid-col-set-equal()`
- `.grid-col-clear()`

**Generates**

Nothing

#### `grid-gutter([@arg1: @spartan-gutter], [@arg2])`

Generate only gutter styles. Especially useful if you have grid setups which only differ in the gutter, so you don't have to generate all classes anew.

**Unlocks**

Nothing

**Generates**

- `.g-row`
- `.g-col`

Checkout the [differing gutter setup](https://github.com/SimonHarte/SpartanGrid/tree/master/examples/differing-gutters.less) example.

You can call `.grid-gutter()` without parameters, in that case it simply relies on your unlocked grid configuration,
or you call it with either a fix value which will be taken as is or provide a relation to which a percentage value will be calculated.

**Rely on Config**
```less
.grid-gutter();
```

**Fixed values**

```less
.grid-gutter(20px);

.grid-gutter(1.5em);

.grid-gutter(3%);
```

**Relational percentage value**

```less
.grid-gutter(940px, 20px);

.grid-gutter(940px, 1.5em); // em are simply multiplied with 16 for calculation
```

#### `grid-generate([@prefix: ''], [@columns: @spartan-cols])`

This mixin will generate all configuration sensitive classes like `.g-span-{xx}`, `.g-offset-{xx}` etc. in the current scope.

> [Read about prefixing](#additional-prefix)

**Generates**

- `.g-span`
- `.g-offset`
- `.g-push`
- `.g-pull`

If you pass an optional column amount, it will use this value for generation while relying on your unlocked config.
So if you know you'll never use classes for more than half the grid width you can reduce output css by only generating those classes:

```less
.grid-generate(@columns: 6);
```

### Viewport Dependent Configurations

You can call `.grid-unlock()`, `.grid-gutter()` and `.grid-generate()` **inside media queries** to generate different grid setups for 
different viewports like so:

```less
// generate base grid styles
.grid-core();

// adjusting the gutter width and type over different viewports

@media (max-width: 40em) {
	// grid setup for small screen
	.grid-unlock(100%, 5px, 12;);
	.grid-gutter();
	.grid-generate();
}
@media (min-width: 40.01em) and (max-width: 65em) {
	// grid setup for medium screen
	.grid-unlock(100%, 15px, 12;);
	.grid-gutter();
	.grid-generate();
}
@media (min-width: 65.01em) {
	// grid setup for large screen
	.grid-unlock(100%, percentage(30px / 940px), 12;);
	.grid-gutter();
	.grid-generate();
}
```

Note that you cannot make a mobile first, global configuration because unlocked mixins like `.grid-span()` can not be reassigned inside media queries and will use global values.

> Of course `.grid-generate()` will produce all the grid styles in the given viewport, so with three viewports you'll have three times the normal css. That's why we invested a lot of effort into keeping the base css as tiny as possible ;).

### Custom Classes

#### Namespace

`.grid-bundle()` (as well as `.grid-core()`) takes an optional parameter `namespace`, with which you can customize the generated classes.

 This namespace is per default set to `g`, but you can freely customize it.
 
 Example with `.grid-bundle('grid')`:

```csss
.grid-row
.grid-col
.grid-span
.grid-offset
// etc...
```

> You can also remove the namespace by passing an empty string (`''`) instead.

#### Additional Prefix

You can further customize the generated classes through an optional parameter to `.grid-generate()` which per default is empty (`''`).
See it as an addition to the namespace which counts for all generated classes while this one only adjusts the configuration sensitive classes.
Lets assume the following setup:

```less
.grid-core('grid');
.grid-unlock(@grid-config);
.grid-generate('test');
```

This will generate the base classes as mentioned in the [namespace section](#namespace):

```css
.grid-row
.grid-col
```

But the other classes will look like this:

```css
.grid-test-span
.grid-test-offset
// etc...
```

> Check out the ["Twitter Bootstrap"](#the-twitter-bootstrap-way) responsive approach too see how this can be of use.

## Semantic Grid

Spartan comes with two mixins for applying grid styles to any selector:

- `.grid-row([@gutter: @spartan-gutter])`
- `.grid-col([@gutter: @spartan-gutter])`

As you could imagine `.grid-row()` applies all row styles to your selector and `.grid-col()` does so for column styles.
You can optionally overwrite the gutter from your previously unlocked settings.

```less
main {
	.grid-row();
	
	article,
	aside {
		.grid-col();
	}
	
	article {
		.grid-span(8);
	}
	
	aside {
		.grid-span(4);
	}
}
```

## Responsive Approaches

### The "Spartan Way"

Our idea and recommended way to implement a responsive grid in your project is to create reusable layouts, it reduces output CSS to only what is actually needed.
There are three mixins which will help you create responsive layouts.

```less
.grid-col-set(<@col-name>, <@col-span>, [@offset], [@reorder]);
.grid-col-set-equal(<@col-span>);
.grid-col-clear(<@columns>);
```

> If your project only consists of layouts and you never use classes like `.grid-span-{xx}` you don't even have to use `.grid-generate()`.

#### `grid-col-set`

Generate a namespaced class `.{col-name}` as direct child of `.g-row`. Note that `[offset]` and `[reorder]` are optional parameters
and can be omitted if not used.

> We use direct child selectors so different responsive layouts cannot interfere with each other.

**Params**

| Param | Type | Value | Comment |
|-------|:-----|:------|:--------|
| `@col-name`    | string | | quotes optional, example: `col-1` |
| `@columns`     | number | only positive | |
| `@offset`      | number | positive or negative | optional, uses `.grid-offset()` to apply indents |
| `@reorder`     | number | positive or negative | optional, uses `.grid-reorder()` to reposition a column |

This mixin is used to define different columns inside a layout, so if one column takes 2/3 of the grid and the other 
1/3 you'd use the mixin twice like this:

```less
.g-layout-2 {
	// max columns: 12
	.grid-col-set('col-1', 8);
	.grid-col-set('col-2', 4);
}
```

Which will enable you to use `.g-col-1` and `.g-col-2` as classes:

```html
<div class="g-row g-layout-2">
	<div class="g-col g-col-1"></div>
	<div class="g-col g-col-2"></div>
</div>
```

#### `grid-col-set-equal`

Generate a direct child selector `.g-col` with the given width and also properly clear columns every 
nth child element using the `.grid-col-clear()` mixin.

Example LessCSS:

```less
@grid-columns: 12;

.g-layout-1 {
	.grid-col-set-equal(@grid-columns/4);
}
```

Example output CSS:

```css
.g-layout-1 > .g-col {
	width: 25%;
}

.g-layout-1 > .g-col:nth-of-type(4n+1) {
	clear: left;
}
```

#### `grid-col-clear`

Clear the float every nth+1 child (every new line) so columns align properly if they differ in height. So if you have 3 columns per 
line, clear the 4th, the 7th, the 10th etc.

> Floating point numbers will always be rounded down to the next integer

### Responsive Layout Example

> **Note**: With a mobile first approach you either have to declare a media query or omit the definition because of possible interfering pseudo selectors (:nth-of-type).

```less
.g-layout-1 {
	// grid maximum columns = 12

	// 1 column in small screen -> no declaration needed

	@media (min-width: 40.01em) and (max-width: 65em) {
		// 2 columns in medium screen
		.grid-col-set-equal(6); // 12 / 2 = 6
	}
	@media (min-width: 65.01em) {
		// 3 columns in large screen
		.grid-col-set-equal(4); // 12 / 3 = 4
	}
}
```

## The "Twitter Bootstrap Way"

If you prefer or have to be able to use a twitter bootstrap like system with viewport specific classes in your markup you can use this technique.
Our highly flexible creation API enables you to generate predefined classes for every viewport you have and set up fully responsive layouts in the markup directly.

Simply make use of the optional parameter to [`.grid-generate()`](#custom-classes) inside media queries like the following:

```less
// grid configuration
@grid-config: 100%, 20px, 12;

.grid-core(); // base classes, no change in namespace
.grid-unlock(@grid-config);
.grid-gutter(); // define gutter once

// generate mobile first, small screen classes
.grid-generate('sm');

// generate medium screen classes
@media (min-width: 40.01em) and (max-width: 65em) {
	.grid-generate('md');
}

// generate large screen classes
@media (min-width: 65.01em) {
	.grid-generate('lg');
}
```

Now you can use these classes in your markup and the columns will change accordingly throughout viewports.

```html
<div class="g-row">
	<div class="g-col g-sm-span-6 g-md-span-4 g-lg-span-3"></div>
	<div class="g-col g-sm-span-6 g-md-span-4 g-lg-span-3"></div>
	<div class="g-col g-sm-span-6 g-md-span-4 g-lg-span-3"></div>
	<div class="g-col g-sm-span-6 g-md-span-4 g-lg-span-3"></div>
</div>
```
