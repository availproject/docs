"use client";
import { Monitor, Moon, Sun } from "@phosphor-icons/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

type ThemeControlProps = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  isMobile?: boolean;
};

const ThemeControlContent = ({ theme, setTheme }: ThemeControlProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <ToggleGroup
        type="single"
        value={theme}
        onValueChange={(v) => v && setTheme(v)}
        variant="outline"
        size="sm"
        spacing={0}
        aria-label="Toggle theme"
      >
        <ToggleGroupItem value="light" aria-label="Light theme">
          <Sun size={12} />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Dark theme">
          <Moon size={12} />
        </ToggleGroupItem>
        <ToggleGroupItem value="system" aria-label="System theme">
          <Monitor size={12} />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

const ThemeControl = ({
  theme,
  setTheme,
  isMobile = false,
}: ThemeControlProps) => {
  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="extend-touch-target flex items-center justify-center size-10"
            aria-label="Toggle theme"
          >
            <Sun size={20} weight="regular" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <ThemeControlContent theme={theme} setTheme={setTheme} />
        </PopoverContent>
      </Popover>
    );
  }

  return <ThemeControlContent theme={theme} setTheme={setTheme} />;
};

export default ThemeControl;
