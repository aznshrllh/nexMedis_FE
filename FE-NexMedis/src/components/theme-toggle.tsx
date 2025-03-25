import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2">
        <Switch
          id="theme-mode"
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
        />
        <Label htmlFor="theme-mode" className="text-sm font-medium">
          {theme === "dark" ? (
            <div className="flex items-center">
              <Moon className="mr-1 h-4 w-4" />
              Dark Mode
            </div>
          ) : (
            <div className="flex items-center">
              <Sun className="mr-1 h-4 w-4" />
              Light Mode
            </div>
          )}
        </Label>
      </div>
    </div>
  );
}
