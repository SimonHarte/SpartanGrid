# Spartan

The next generation LessCSS grid system. Try the [dynamic online grid demo](http://spartan-grid.herokuapp.com/).

> Requires [LessCSS](https://github.com/less/less.js) version 1.4.0 or above. Currently **does not** work with less version 1.7.0.

Spartan arose from a project where we had the need for a fluid responsive grid system with both html and less integration possibilities. As we couldn't find anything covering the requirements at that time we simply developed something on our own. Over time the initial idea developed into this vastly enhanced less grid system.


## Features

- supports all features of other common grid systems:
	- fluid or static grid
	- fully responsive
	- block gutter (fixed gutter in a fluid grid)
	- column reordering through css
	- column offsets
- grid creation API: **make viewport dependent grid setups**
- custom css prefix: multiple grid configurations possible
- short classes and corresponding less mixins
- tiny: **~11KB** of LessCSS which generates less than **2KB** of minified css

## Comparison

Just some common grid systems in comparison to Spartan:

|                   | Spartan | Twitter Bootstrap | Foundation | 960grid |
|-------------------|:-------:|:-----------------:|:----------:|:-------:|
| less              | ✅ | ✅ | ❌ | ❌ |
| sass              | ❌ | ❌ | ✅ | ❌ |
| fluid             | ✅ | ✅ | ✅ | ✅ |
| static            | ✅ | ✅ | ✅ | ✅ |
| responsive        | ✅ | ✅ | ✅ | ❌ |
| block gutter      | ✅ | ✅ | ✅ | ❌ |
| column ordering   | ✅ | ✅ | ✅ | ✅ |
| offsets           | ✅ | ✅ | ✅ | ✅ |
| viewport dependent grid setups | ✅ | ❌ | ❌ | ❌ |
| custom prefix     | ✅ | ❌ | ❌ | ❌ |
| base css size (min)    | **1.7KB** | **11KB** | **9.5KB** | **2.7KB** |

## Getting Started

- Download Spartan
- Install [Node](http://nodejs.org/) and then LessCSS: `npm install -g less@1.6.3`
- Adjust the params in `grid-setup.less`
- Execute: `lessc compile.less grid.css`
- Use the given classes in your markup or set up responsive layouts as needed

## Grid Structure

Here's a short example of how a Spartan grid looks like with a responsive layout implementation:

**HTML**

```html
<div class="row layout-r-1">
	<div class="col"></div>
	<div class="col"></div>
	<div class="col"></div>
	<div class="col"></div>
</div>
```

**LessCSS**

```less
.layout-r-1 {
	// maximum columns: 12
	// omit small media definition as it uses full width anyway
	@media @medium {
		.grid-col-set-equal(6);
	}
	@media @large {
		.grid-col-set-equal(4);
	}
}
```

Check out [examples](https://github.com/SimonHarte/SpartanGrid/blob/master/examples/responsive-layouts.less) for more responsive layouts.

## Basic Usage

### Grid Setup

Spartan comes with three API mixins to easily set up grids:

```less
.grid-core([prefix]);
.grid-unlock([grid-type], [grid-width], [gutter-width], [grid-type], [grid-columns]);
.grid-generate([prefix]);
```

The mixin `.grid-core()` should be executed once in most cases, it generates all ([prefixed](#prefixing)) base classes and styles which are needed for any grid setup.

You can then call `.grid-unlock()` which will unlock all grid mixins in the current [less scope](http://lesscss.org/features/#features-overview-feature-scope), those will be used by `.grid-generate()` to generate the setup specific classes and styles.

#### Setup Params

| Param | Type | Value | Comment |
|-------|:-----|:------|:--------|
| `grid-type`    | string  | `'fluid'` or `'fixed'` | |
| `grid-width`   | pixel   | | |
| `gutter-width` | pixel   | | |
| `gutter-type`  | string  | `'fluid'` or `'fixed'` | Forced to `'fixed'` if `grid-type` is `'fixed'` |
| `grid-columns` | integer | | | |

#### Example Setup and Usage

**LessCSS**

```less
// generate base grid classes
.grid-core();

// unlock grid variables and mixins according to config parameters
.grid-unlock('fluid', 960px, 20px, 'fluid', 12);

// generate grid classes with current scope variables
.grid-generate();
```

Since v2.2.0 the grid configuration for `.grid-unlock()` can either be passed as separate values or bundled in a reusable variable, like this:

```less
@grid-config: 'fluid', 960px, 20px, 'fluid', 12;

// unlock grid variables and mixins according to config parameters
.grid-unlock(@grid-config);
```

**HTML**

```html
<!-- defining two columns in the current grid (max columns: 12) -->
<div class="row">
	<div class="col col-span-6"></div>
	<div class="col col-span-6"></div>
</div>
```

- `.row` initializes a grid row and uses [H5BP clearfix](https://github.com/h5bp/html5-boilerplate/blob/master/css/main.css#L161) to contain the floating `.col`s.
- `.col` applies default column styles like float and padding (gutter).
- `.col-span-[columns]` applies a column based width according ot the set maximum amount of columns.

### Grid Classes/Mixins Overview

Instead of using the generated grid classes you can also use similar named mixins to apply the grid in a less style sheet.

```less
.grid-col-span([columns]) = .col-span-[columns]
.grid-offset([columns]) = .offset-[columns]
.grid-push([columns]) = .push-[columns]
.grid-pull([columns]) = .pull-[columns]
```

#### `grid-col-span`
Override the width of a column (default is full-width), equivalent to `.col-span-[columns]`.
Although you could just use the generated `.col-span-[columns]` classes, this mixin allows you to pass in any floating point number,
which enables you to set up a grid row with for example 5 columns with proper gutter size in a 12 column grid.

```less
.grid-col-span(12/5);
```

#### `grid-offset`
Indent a column by the defined amount of grid columns, equivalent to `.offset-[columns]`.
While there are just positive indents in generated classes, you could also call this mixin with negative values.

> **Note:** Negative indents only work properly in static width grids.

#### `grid-push` and `grid-pull`
Together with the additional class `.ordered` on `.row` you can reorder columns visually without changing the order in HTML.
Note that you may run into problems if these are used within certain responsive layouts as they use relative positioning.
Equivalent to `push-[columns]` and `pull-[columns]`, similar behavior as `.grid-offset()`.

### Setting up Responsive Layouts

There are three mixins which will help you create responsive layouts.

```less
.grid-col-set([col-name], [columns], [offset]);
.grid-col-set-equal([columns]);
.grid-col-clear([column-count]);
```

#### `grid-col-set`
Generate a class `.[col-name]` with `[columns]` width and `[offset]` indent as direct child of `.row` with the given width.

> We use direct child selectors so different responsive layouts cannot interfere with each other.

#### `grid-col-set-equal`
Generate a `.col` selector as direct child of `.row` with the given width and also properly clear columns every nth child element using the `.col-clear()` mixin.

#### `grid-col-clear`
Clear the float every nth+1 columns if columns differ in height, so if you have 3 columns per line, clear the 4th, the 7th, the 10th etc.

### Responsive Layout Example
With the following example you get a layout where you have one column if the viewport is smaller than 40em, 2 columns if it's between 40em and 80em and 3 columns if its above 80em.

```less
.layout-r-1 {
	// grid maximum columns = 12

	@media (max-width: 39.99em) {
		.grid-col-set-equal(12);
	}
	@media (min-width: 40em) and (max-width: 79.99em) {
		.grid-col-set-equal(6);
	}
	@media (min-width: 80em) {
		.grid-col-set-equal(4);
	}
}
```

> **Note**: With a mobile first approach you either have to declare a media query or omit the definition because of the nth-child selector in `col-set-equal`.

Another working example of the above:

```less
.layout-r-1 {
	// grid maximum columns = 12

	// omit small query definition if you'd set it to maximum grid width anyway

	@media (min-width: 40em) and (max-width: 79.99em) {
		.grid-col-set-equal(6);
	}
	@media (min-width: 80em) {
		.grid-col-set-equal(4);
	}
}
```

## Advanced Usage

### Viewport Dependent Setups

You can call `.grid-unlock()` and `.grid-generate()` **inside media queries** and thus generate different grid setups for different viewports like so:

```less
// generate base grid styles
.grid-core();

// grid setup for small screen
@media (max-width: 39.99em) {
	.grid-unlock('fluid', 960px, 5px, 'fixed', 12);
	.grid-generate();
}
// grid setup for medium screen
@media (min-width: 40em) and (max-width: 79.99em) {
	.grid-unlock('fluid', 960px, 15px, 'fixed', 12);
	.grid-generate();
}
// grid setup for large screen
@media (min-width: 80em) {
	.grid-unlock('fluid', 960px, 30px, 'fluid', 12);
	.grid-generate();
}
```

> Of course `.grid-generate()` will generate all the grid styles in the given viewport, so with three viewports you'll have three times the normal css. That's why we invested a lot of effort into keeping the base css as tiny as possible ;).

> **Attention**: If you're not using Spartan in less only, it is not recommended to change the column amount, because you then may have missing column classes.

You can always use `.grid-unlock()` in any separated media query to unlock grid mixins with the given parameters again.

```less
// unlock mixins in another media query again
// no css will be generated but you can correctly reuse the grid mixins
@media (min-width: 40em) and (max-width: 79.99em) {
	.grid-unlock('fluid', 960px, 15px, 'fixed', 12);
	.col {
		.grid-col-span(6);
	}
}
```

> **Hint**: Save different grid setups in global variables to reuse anywhere.

### Prefixing

`.grid-core()` and `.grid-generate()` take one parameter `prefix`, with which you can customize the generated classes.

 So if you set `prefix` to for example `grid-` the generated classes will look like this:

```less
.grid-row
.grid-col
.grid-col-span
// etc...
```

Note that you must pass the same `prefix` to both mixins to generate a fully working grid.

> By using mixins for the grid setup Spartan even allows you to generate multiple grid systems in one project.

### Responsive Layout Container

You can either apply responsive layouts by adding the class to the `.row` directly or make a whole section with multiple `.row`s which use the layout by wrapping them with a container using the layout class.

```html
<div class="row layout-r-1>
	<div class="col"></div>
	<div class="col"></div>
	<div class="col"></div>
</div>
```

Or

```html
<div class="layout-r-1>
	<div class="row>
		<div class="col"></div>
		<div class="col"></div>
		<div class="col"></div>
	</div>
	<div class="row>
		<div class="col"></div>
		<div class="col"></div>
		<div class="col"></div>
	</div>
</div>
```

## Browser Support

**Not** supported:

- IE7-: wrong behavior with negative `.row` margin and no box-sizing

**Partially** supported:

- IE8: basic grid working, no media query support and :nth-child clearing, **Note:** fully supported with [respond.js](https://github.com/scottjehl/Respond) and [selectivizr.js](http://selectivizr.com/) polyfills
- Safari: wrong measures with lots of small columns caused by rounding to integer when converting percentage values to rendered pixels

## Contributors

- Simon Harte (s.harte@gmx.ch)
- Marc Diethelm (marc@web5.me)
