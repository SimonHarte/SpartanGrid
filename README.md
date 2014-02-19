responsibly
===========
The flexible yet simple responsive grid system.

Why
===========
Responsibly arose from a project where we had the need for a fluid responsive grid system with both html and less integration possibilities.
As we couldn't find anything covering the requirements at that time we simply took the time to develop something on our own.
Over time through usage feedback, reviews and optimisations the initial idea developed into this vastly enhanced less grid system, called **responsibly**.

Contributors
===========
- Simon Harte (s.harte@gmx.ch)
- Marc Diethelm (marc@web5.me)

How it works
===========
It is quite simple: You define a fixed grid width, a fixed gutter and an amount of grid columns, everything else is done with less.

The fixed widths are just there to calculate the gutter relatively to the given width (or set up a static width grid).
The grid defines a row which has a compensating negative left margin and inside that you have columns with only left margins.

You can set column widths, offsets etc. through specific, short classes or similar named mixins.

Unlike many other grid systems responsibly doesn't use .omega classes or last/first-child selectors or similar to eliminate gutters where required.
Instead you have a consistent structure which enables a simple implementation of responsive layouts.

Getting started
===========
- Integrate responsibly in your project
- adjust `grid-config.less`
- Use the given classes in your markup or set up your own responsive layouts

Details
===========
Explaining the setup and class scheme in dummy less code:

	@grid-fixed-width: 960px;
	@grid-fixed-gutter: 20px;
	@grid-max-cols: 12;
	
	.row {
		.clearfix();
		margin-left: -@gutter;
		
		.col {
			float: left;
			margin-left: @gutter;
		}
		
		.col-span-3 {
			width: 25% - @gutter;
		}
	}

That's basically all there is: a .row, a .col and .col-span-width

## Grid mixins overview
	.col-span([columns]);
	.offset([columns]);
	.push([columns]);
	.pull([columns]);

### col-span
Used to set the column width, equivalent to `.col-span-[columns]`.
Although you could just use the generated `.col-span-[columns]` classes as well, this mixin allows you to pass in any floating point number to generate a width,
which enables you to set up a grid row with for example 5 columns with proper gutter size in a 12 column grid.

### offset
Indent a column by the defined amount of grid columns, equivalent to `.offset-[columns]`.
While there are just positive indents in generated classes, you could also call this mixin with negative values.

### push and pull
Together with the additional class `.ordered` on `.row` you can reorder columns visually without changing the order in HTML.
Note that you will have problems if these are used within certain responsive layouts.
Equivalent to `push-[columns]` and `pull-[columns]`, similar behavior as `.offset()`.


Setting up responsive layouts
===========
There are 3 mixins which will help you create responsive layout.

## Helper mixins overview

	.col-set([col-name], [columns]);
	.col-set-equal([columns]);
	.col-clear([column-count]);

### col-set
Generate a class `.[col-name]` with the given width.

### col-set-equal
Generate a ´.col´ selector with the given width and also properly clear columns every nth-child element using the `.col-clear()` mixin.

Example: if you have 6 columns in total but only 3 columns per line you want to clear the 4th element, so if the 3rd element is smaller (in height) than the 2nd the 4th won't align itself directly under the 3rd... got it? ;)

### col-clear
Clear the float every nth+1 columns, so like in the example above if you have 3 columns per line, clear the 4th, the 7th, the 10th etc.

## Responsive layout example
With the following example you get a layout where you have one column if the viewport is smaller than 40em, 2 columns if it's between 40em and 80em and 3 columns if its above 80em.

	.layout-r-1 {
		// grid maximum columns = 12
		
		@media (max-width: 40em) {
			.col-set-equal(12);
		}
		@media (min-width: 40em) and (max-width: 80em) {
			.col-set-equal(6);
		}
		@media (min-width: 80em) {
			.col-set-equal(4);
		}
	}
	
Defining the grid type
===========
There is one special setup variable: ```@grid-type```

With this variable you can define if you either want a fluid or static width grid, the other grid variables stay the same, responsibly just does different calculations using these values.

**Note:** Keep in mind that you most likely can't just switch the grid type mid-project because of nested layouts, where fluid widths apply properly while static widths won't be correct.


Advantages
===========
- Small in size: **~8KB** of less code which per default generates **~2KB** of minified css.
- With minimal configuration you can swiftly set up standard grid layouts using simple, generated classes.
- Provides different less mixins to easily set up responsive layouts as you need them.
- Actually even non-grid layouts are possible using the mixins as the values get calculated in less.

Caveats
===========
- basic knowledge of less needed to set up responsive grid layouts.

Examples
===========
[See fluid responsive example](http://responsibly-grid.herokuapp.com/)

Responsibly is integrated in the [such.less frontend library](https://github.com/MarcDiethelm/such.less) and with that also in the [xtc](https://github.com/MarcDiethelm/xtc) project, check them out!