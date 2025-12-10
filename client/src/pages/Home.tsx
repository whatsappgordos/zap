import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Streamdown } from 'streamdown';

const UTMIFY_PIXEL = `
<script>
  window.pixelId = "67fc2ba806eb140157116830";
  var a = document.createElement("script");
  a.setAttribute("async", "");
  a.setAttribute("defer", "");
  a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
  document.head.appendChild(a);
</script>
`;

/**
 * All content in this page are only for example, replace with your own feature implementation
 * When building pages, remember your instructions in Frontend Best Practices, Design Guide and Common Pitfalls
 */
export default function Home() {
  // If theme is switchable in App.tsx, we can implement theme toggling like this:
  // const { theme, toggleTheme } = useTheme();

  // Use APP_LOGO (as image src) and APP_TITLE if needed

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: UTMIFY_PIXEL }} />
      <div className="min-h-screen flex flex-col">
        <main>
          {/* Example: lucide-react for icons */}
          <Loader2 className="animate-spin" />
          Example Page
          {/* Example: Streamdown for markdown rendering */}
          <Streamdown>Any **markdown** content</Streamdown>
          <Button variant="default">Example Button</Button>
        </main>
      </div>
    </>
  );
}
