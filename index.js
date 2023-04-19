import puppeteer from "puppeteer";

// Start a Puppeteer session with:
// - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
// - no default viewport (`defaultViewport: null` - website page will in full width and height)
const getQuotes = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  //open new page
  const page = await browser.newPage();

  //on this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)

  await page.goto("http://quotes.toscrape.com/", {
    waitUntil: "domcontentloaded",
  });

  // Get page data
  const quotes = await page.evaluate(() => {
    // Fetch the first element with class "quote" , Get the displayed text and returns it
    //querySelector 1 tane seçer , querySelectorAll hepsini

    const quoteList = document.querySelectorAll(".quote");

    // Convert the quoteList to an iterable array
    // For each quote fetch the text and author

    return Array.from(quoteList).map((quote) => {
      // Fetch the sub-elements from the previously fetched quote element
      // Get the displayed text and return it (`.innerText`)

      const text = quote.querySelector(".text").innerText;
      const author = quote.querySelector(".author").innerText;

      return { text, author };
    });
  });

  // Display the quotes
  console.log(quotes);

  // Click on the "Next page" button
  // await page.click(".pager > .next > a")

  // Close the browser
  await browser.close();
};

//start the scraping
getQuotes();
