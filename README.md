# responsibly

The flexible yet simple responsive grid system.

# Why

Responsibly arose from a project where we had the need for a fluid responsive grid system with both html and less integration possibilities.
As we couldn't find anything covering the requirements at that time we simply developed something on our own.

Over time, through usage feedback, reviews and optimisations, the initial idea developed into this vastly enhanced less grid system, called **responsibly**.

# Contributors

- Simon Harte (s.harte@gmx.ch)
- Marc Diethelm (marc@web5.me)

# Requirements

- Less version >= 1.4.0

# How it works

It is quite simple: You define a fixed grid width, a fixed gutter and an amount of grid columns, everything else is done with less. You can then use generated classes to set up grid layouts.

The fixed widths are there to calculate the relative percentage gutter and column widths or naturally set up a static width grid.
The grid defines a row which has a compensating negative left margin and inside that you have columns with only left margins.

You can set column widths, offsets etc. through specific, short classes or similar named mix-ins.

Unlike many other grid systems responsibly doesn't use .omega classes or last/first-child selectors etc. to eliminate gutters where required.
Instead you have a consistent structure which enables a simple implementation of responsive layouts.

# Getting started

- Integrate responsibly in your project
- adjust `grid-config.less`
- Use the given classes in your markup or set up responsive layouts as needed

# Details

Example setup and grid structure:

**less**

	// grid setup variables
	@grid-fixed-width: 960px;
	@grid-fixed-gutter: 20px;
	@grid-max-cols: 12;

**HTML**

	<!-- defining two columns in the current grid (max columns: 12) -->
	<div class="row">
		<div class="col col-span-6"></div>
		<div class="col col-span-6"></div>
	</div>

- `.row` initializes a grid row and uses [clearfix](https://github.com/h5bp/html5-boilerplate/blob/master/css/main.css#L161) to contain the floating `.col`s.
- `.col` applies default column styles like float and margin (gutter).
- `.col-span-[columns]` applies a column based width according ot the set maximum amount of columns.

## Grid class generation

Responsibly comes with a [less loop](http://blog.thehippo.de/2012/04/programming/do-a-loop-with-less-css/) to generate all the base classes using your settings.

So if you've set for example `@grid-max-cols: 16`, you'll get class selectors ranging from `.col-span-1` to `.col-span-16` which can be used right away.

## Grid mix-ins overview

Instead of using the generated grid classes you can also use similar named mixins to implement the grid with less.

	.col-span([columns]);
	.offset([columns]);
	.push([columns]);
	.pull([columns]);

### col-span
Used to set the column width, equivalent to `.col-span-[columns]`.
Although you could just use the generated `.col-span-[columns]` classes as well, this mix-in allows you to pass in any floating point number to generate a width,
which enables you to set up a grid row with for example 5 columns with proper gutter size in a 12 column grid.

### offset
Indent a column by the defined amount of grid columns, equivalent to `.offset-[columns]`.
While there are just positive indents in generated classes, you could also call this mix-in with negative values.

### push and pull
Together with the additional class `.ordered` on `.row` you can reorder columns visually without changing the order in HTML.
Note that you may run into problems if these are used within certain responsive layouts as they use relative positioning.
Equivalent to `push-[columns]` and `pull-[columns]`, similar behavior as `.offset()`.


# Setting up responsive layouts

There are 3 mix-ins which will help you create responsive layout.

## Helper mix-ins overview

	.col-set([col-name], [columns]);
	.col-set-equal([columns]);
	.col-clear([column-count]);

### col-set
Generate a class `.[col-name]` as direct child of `.row` with the given width.

### col-set-equal
Generate a `.col` selector as direct child of `.row` with the given width and also properly clear columns every nth child element using the `.col-clear()` mix-in.

### col-clear
Clear the float every nth+1 columns, so like in the example above if you have 3 columns per line, clear the 4th, the 7th, the 10th etc.

## Responsive layout example
With the following example you get a layout where you have one column if the viewport is smaller than 40em, 2 columns if it's between 40em and 80em and 3 columns if its above 80em.

	.layout-r-1 {
		// grid maximum columns = 12
		
		@media (max-width: 39.99em) {
			.col-set-equal(12);
		}
		@media (min-width: 40em) and (max-width: 79.99em) {
			.col-set-equal(6);
		}
		@media (min-width: 80em) {
			.col-set-equal(4);
		}
	}
	
You can either apply responsive layouts by adding the class to the `.row` directly or make a whole section with multiple `.row`s which use the layout by wrapping them with a container using the layout class.

See more [example responsive layouts](examples/responsive.layouts.les) for usage details.

Example:

	<div class="row layout-r-1>
		<div class="col"></div>
		<div class="col"></div>
		<div class="col"></div>
	</div>
	
Or

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

# Defining the grid type

There is one special setup variable: `@grid-type`

With this variable you can define if you either want a fluid or static width grid, the other grid variables stay the same, responsibly just does different calculations using these values.

**Note:** Keep in mind that you most likely can't just switch the grid type mid-project because of nested layouts, where fluid widths apply properly while static widths won't be correct.

# Advantages

- Small in size: **~8KB** of less code which per default generates **~2KB** of minified css (responsive layouts excluded).
- With minimal configuration you can swiftly set up standard grid layouts using simple, generated classes.
- Provides less mix-ins to easily set up responsive layouts as you need them instead of generating a whole bunch of classes.
- Actually even non-grid layouts are possible using the mix-ins as the values get calculated in less.

# Caveats

- less compiler/build must be present.
- basic knowledge of less needed to set up responsive grid layouts.

# Browser Support

**Not** supported:

- IE7-: completely wrong behavior with negative `.row` margin

**Partially** supported:

- IE8: basic grid working, no media query support and :nth-child clearing, **Note:** fully supported with [respond.js](https://github.com/scottjehl/Respond) and [selectivizr.js](http://selectivizr.com/) polyfills
- Safari: wrong measures with lots of small columns caused by rounding to integer when converting percentage values to rendered pixels
 
# Examples

[See fluid responsive example](http://responsibly-grid.herokuapp.com/)

Responsibly is integrated in the [such.less frontend library](https://github.com/MarcDiethelm/such.less) and with that also in the [xtc](https://github.com/MarcDiethelm/xtc) project, check them out!

# ToDos

- port to SASS (even though there already are good grid systems for SASS like [susy](https://github.com/ericam/susy))