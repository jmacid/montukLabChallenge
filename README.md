# Montuk Lab Challenge

The project consists of a web page and a backend that looks for foods based on the nutrients selected. The former was created using React, Material UI, and Typescript and was deployed to Netlify. The latter are 3 Netlify functions written in Typescript that connect to a supabase database (Postgres).

The data in the database was taken from the [USDA](https://fdc.nal.usda.gov/download-datasets.html) web and the **Foundation Foods** file was used due to its size. The data was extracted and processed and later pushed to 3 different tables:
* foods: data related to food
* nutrients: data related to nutrients
* food_nutrients: this table relates the food with the nutrients

The frontend is made of two pages: home and about. The about page has a brief explanation about the reasons why the page was made and a link to the repository. On the other hand, the home page has a select component that fetches the list of nutrients from a backend function (*getNutrientsList*). The selected nutrients are shown below the select component and their ids are sent to *getFoodByNutrients* which returns the foods that match the nutrients. The food is displayed as cards with information and a button. The button sends a request to *getFoodInfo* to obtain nutritional information about the specific food and opens a modal to present the information.

This site was deployed to Netlify (`https://timely-flan-5fe4e8.netlify.app`).

## References
* [Site URL](https://timely-flan-5fe4e8.netlify.app)
* [Data set source](https://fdc.nal.usda.gov/download-datasets.html)

<!-- sudo lsof -i -P -n | grep LISTEN -->