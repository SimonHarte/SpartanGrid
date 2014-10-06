# Spartan Grid Documentation

- [Basic Usage](#basic-usage)
- [Advanced Usage](#advanced-usage)
	- [Grid Setup API](#grid-setup-api)
	- [Viewport Dependent Grids](#viewport-dependent-grids)
	- [Custom Classes](#custom-classes)
- [Responsive Approaches](#responsive-approaches)
	- [The "Spartan Way"](#the-spartan-way-layouts)
	- [The "Twitter Bootstrap Way"](#the-twitter-bootstrap-way-building-bricks)

## Basic Usage

All about basic usage of Spartan is documented in the [project readme](https://github.com/SimonHarte/SpartanGrid/blob/master/README.md#basic-usage).

## Advanced Usage

### Grid Setup API

You would normally just use `.grid-bundle()` to set up a grid, but you can also use the following mixins to generate even more flexible grids in [LessCSS scopes](http://lesscss.org/features/#features-overview-feature-scope), see [Viewport Dependent Grids](#viewport-dependent-grids) and [Custom Classes](#custom-classes) for use cases.

#### `.grid-core([namespace])`

This will generate the core selectors and styles needed for any grid setup, e.g. clearing on the row, float of columns etc. No matter how much you customize your grid, this mixin has to be called only once in your project.

#### `.grid-unlock([config])`

Pass in your grid configuration like with `.grid-bundle()`. This will unlock all the grid mixins using your 
configuration within the current scope and adjust the gutters.

```less
#my-scope {
	.grid-unlock(@scope-config);
	
	.custom-column {
		.grid-span(5);
	}
}
```

#### `.grid-gutter()`

Generate only gutter styles. Especially useful if you have grid setups which only differ in the gutter, so you don't have to generate gutter styles anew.

*Example old*:

```less
.grid-core();

// grid configurations have different gutters only
@grid-config-1: 940px, 'fluid', 20px, 'fixed', 12;
@grid-config-2: 940px, 'fluid', 15px, 'fluid', 12;

// unlock and use spartan in one scope (layout)
.some-scope {
	// every unlock generated gutter styles
	.grid-unlock(@grid-config-1);
	
	// etc...
}

// unlock differing config in another scope
.alternate-scope {
	// every unlock generated gutter styles
	.grid-unlock(@grid-config-2);
	
	// etc...
}

// unlock first config again in a new scope
.last-scope {
	// every unlock generated gutter styles
	.grid-unlock(@grid-config-1);
	
	// etc...
}
```

*Example NEW*:

```less
.grid-core();

// same grid configs as above
// generate gutter styles once for different scopes

.some-scope {
	.grid-unlock(@grid-config-1);
	.grid-gutter();
}

.alternate-scope {
	.grid-unlock(@grid-config-2);
	.grid-gutter();
}

.last-scope {
	// get gutter styles from one scope
	&:extend(.some-scope all);
	
	// unlock does not generate gutters again
	.grid-unlock(@grid-config-1);
	
	// etc...
}
```

#### `.grid-generate([prefix])`

This mixin will generate all configuration sensitive classes like `.g-span-`, `.g-offset` etc. in the current scope.

> [Read about prefixing](#additional-prefix)

### Viewport Dependent Grids

You can call `.grid-unlock()` and `.grid-generate()` **inside media queries** to generate different grid setups for 
different viewports like so:

```less
// generate base grid styles
.grid-core();

// adjusting the gutter width and type over different viewports

@media (max-width: 40em) {
	// grid setup for small screen
	.grid-unlock(@config: 'fluid', 940px, 5px, 'fixed', 12;);
	.grid-gutter();
	.grid-generate();
}
@media (min-width: 40.01em) and (max-width: 65em) {
	// grid setup for medium screen
	.grid-unlock(@config: 'fluid', 940px, 15px, 'fixed', 12;);
	.grid-gutter();
	.grid-generate();
}
@media (min-width: 65.01em) {
	// grid setup for large screen
	.grid-unlock(@config: 'fluid', 940px, 30px, 'fluid', 12;);
	.grid-gutter();
	.grid-generate();
}
```

Note that you cannot make a mobile first, global configuration because the global mixins like `.grid-span()` can not be reassigned inside media queries.

> Of course `.grid-generate()` will generate all the grid styles in the given viewport, so with three viewports you'll have three times the normal css. That's why we invested a lot of effort into keeping the base css as tiny as possible ;).

You can always use `.grid-unlock()` in any separated media query to unlock grid mixins again.

```less
// unlock mixins in another media query again
@media (min-width: 40.01em) and (max-width: 65em) {
	.grid-unlock('fluid', 940px, 15px, 'fixed', 12);
	
	.g-col {
		.grid-span(6);
	}
}
```

> **Hint**: Save different grid setups in global variables to reuse anywhere.

### Custom Classes

#### Namespace

`.grid-bundle()` (as well as `.grid-core()`) takes one optional parameter `namespace`, with which you can customize the generated classes.

 This namespace is per default set to `g-`, but you can simply just change it, so if you set `namespace` to for example 
 `grid-` the generated classes will look like this:

```less
.grid-row
.grid-col
.grid-span
.grid-offset
// etc...
```

> You can also remove the namespace by passing `~''` instead.

#### Additional Prefix

You can further customize the generated classes through an optional parameter to `.grid-generate()`.
See it as an addition to the namespace which counts for all generated classes while this one only adjusts the configuration sensitive classes.
Lets assume the following setup:

```less
.grid-core(grid-);
.grid-unlock(@grid-config);
.grid-generate(test);
```

This will generate the base classes as mentioned in the [namespace section](#namespace):

```less
.grid-row
.grid-col
```

But the other classes will look like this:

```less
.grid-test-span
.grid-test-offset
// etc...
```

> Check out the ["Twitter Bootstrap"](#the-twitter-bootstrap-way) responsive approach too see how this can be of use.

## Responsive Approaches

### The "Spartan Way"

Our idea and recommended way to implement a responsive grid in your project is to create reusable layouts, it reduces output CSS to only what is actually needed.
There are three mixins which will help you create responsive layouts.

```less
.grid-col-set([col-name], [columns], [offset], [reorder]);
.grid-col-set-equal([columns]);
.grid-col-clear([column-count]);
```

#### `grid-col-set`

Generate a namespaced class `.[col-name]` as direct child of `.g-row`. Note that `[offset]` and `[reorder]` are optional parameters
and can be omitted if not used.

> We use direct child selectors so different responsive layouts cannot interfere with each other.

**Params**

| Param | Type | Value | Comment |
|-------|:-----|:------|:--------|
| `col-name`    | expression | | Example: `col-1` (without single quotes) |
| `columns`     | number | only positive | |
| `offset`      | number | positive or negative | optional, uses `.grid-offset()` to apply indents |
| `reorder`     | number | positive or negative | optional, uses `.grid-reorder()` to reposition a column |

This mixin is used to define different columns inside a layout, so if one column takes 2/3 of the grid and the other 
1/3 you'd use the mixin twice like this:

```less
.g-layout-2 {
	// max columns: 12
	.grid-col-set(col-1, 8);
	.grid-col-set(col-2, 4);
}
```

Which will enable you to use `.g-col-1` and `.g-col-2` as classes:

```html
<div class="g-row g-layout-2">
	<div class="g-col g-col-1"></div>
	<div class="g-col g-col-2"></div>
</div>
```

Example with reordered columns:

```less
.g-layout-3 {
	// apply .g-reorder styles
	.grid-row-reorder();
	
	// switch positions of columns
	.grid-col-set(col-1, 6, 0, 6);
	.grid-col-set(col-2, 6, 0, -6);
}
```

#### `grid-col-set-equal`

Generate a `.g-col` selector as direct child of `.g-row` with the given width and also properly clear columns every 
nth child element using the `.grid-col-clear()` mixin.

#### `grid-col-clear`

Clear the float every nth+1 child (every new line) so columns align properly if they differ in height. So if you have 3 columns per 
line, clear the 4th, the 7th, the 10th etc.

### Responsive Layout Example

> **Note**: With a mobile first approach you either have to declare a media query or omit the definition because of possible interfering pseudo selectors (:nth-child).

```less
.g-layout-1 {
	// grid maximum columns = 12

	// 1 column in small screen -> no declaration needed

	@media (min-width: 40.01em) and (max-width: 65em) {
		// 2 columns in medium screen
		.grid-col-set-equal(6);
	}
	@media (min-width: 65.01em) {
		// 3 columns in large screen
		.grid-col-set-equal(4);
	}
}
```

> You can optimise the output css by wrapping all your layouts with media queries once to remove duplication of media
 query definitions in the css, but this is way harder to maintain with an increasing amount of layouts.

## The "Twitter Bootstrap Way"

If you prefer or have to be able to use a twitter bootstrap like system with viewport specific classes in your markup you can use this technique.
Our highly flexible creation API enables you to generate predefined classes for every viewport you have and set up fully responsive layouts in the markup directly.

Simply make use of the optional parameter to [`.grid-generate()`](#custom-classes) inside media queries like the following:

```less
// grid configuration
@grid-config: 'fluid', 940px, 20px, 'fixed', 12;

.grid-core(); // base classes, no change in namespace
.grid-unlock(@grid-config);

// generate mobile first, small screen classes
.grid-generate(sm);

// generate medium screen classes
@media (min-width: 40.01em) and (max-width: 65em) {
	.grid-generate(md);
}

// generate large screen classes
@media (min-width: 65.01em) {
	.grid-generate(lg);
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

You could even connect this with [viewport dependent grid setups](#viewport-dependent-grids), imagine the possiblities, that's how mighty Spartan really is!