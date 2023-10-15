# FOIWorkingDayCalculator

A website to help with the calculation of time limits under the [Freedom of Information Act](https://www.legislation.gov.uk/ukpga/2000/36/contents), for example the 20 working day limit to respond to a Freedom of Information request.

The Act defines working days as being "any day other than a Saturday, a Sunday, Christmas Day, Good Friday or a day which is a bank holiday under the [Banking and Financial Dealings Act 1971](https://www.legislation.gov.uk/ukpga/1971/80/contents) in any part of the United Kingdom".

The 1971 Act declares some days as being bank holidays, such as new year's day, good friday, and boxing day, but additionally allows the monarch or the secretary of state to proclaim further bank holidays (or proclaim a date that was a bank holiday to no longer be so).

This website calculates which days are working days, including by retrieving proclamations using using [my bankholiday_retriever repo](https://github.com/cyruscook/bankholiday_retriever), and will calculate the 20 working day time limit.
You can use the website here: https://cyruscook.github.io/FOIWorkingDayCalculator/
