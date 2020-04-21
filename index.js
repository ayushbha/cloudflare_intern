async function handleRequest(request) {
	 const response = await fetch(request);
	 data = await response.json()
	 data = data.variants;
	 selected = data[Math.floor(Math.random() * data.length)];
	 const res = await fetch(selected);
	 return rewriter.transform(res)
}
 
class ElementHandler {
  element(element) {
    console.log(`Incoming element: ${element.tagName}`)
    if(element.tagName==="title"){
    element.setInnerContent("Hello Testing")
    }
    else if(element.tagName==="h1"){
    	element.setInnerContent("Variation")
    }
    else if(element.tagName==="a"){
    	element.setInnerContent("Return to google.com")
    }
    else if(element.tagName==="p"){
    	element.setInnerContent("Take home test")
    }
  }
}
class AttributeRewriter {
  constructor(attributeName) {
    this.attributeName = attributeName
  }
 
  element(element) {
    const attribute = element.getAttribute(this.attributeName)
    if (attribute) {
      element.setAttribute(
        this.attributeName,
        attribute.replace("https://cloudflare.com",'https://google.com')
      )
    }
  }
}
const rewriter = new HTMLRewriter()
  .on('title', new ElementHandler()).on('h1',new ElementHandler()).on('a',new ElementHandler()).on('p',new ElementHandler()).on('a',new AttributeRewriter('href'));

addEventListener('fetch', event => {
  event.respondWith(handleRequest("https://cfw-takehome.developers.workers.dev/api/variants"));
})