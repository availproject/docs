"use client";
import { Moon, Monitor, Palette, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

type ThemeControlProps = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  palette: string;
  setPalette: React.Dispatch<React.SetStateAction<string>>;
  isMobile?: boolean;
};

const PALETTES: Record<string, string> = {
  default: "default",
};

const ThemeControlContent = ({
  theme,
  setTheme,
  palette,
  setPalette,
}: ThemeControlProps) => {
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
          <Sun className="size-3" />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Dark theme">
          <Moon className="size-3" />
        </ToggleGroupItem>
        <ToggleGroupItem value="system" aria-label="System theme">
          <Monitor className="size-3" />
        </ToggleGroupItem>
      </ToggleGroup>
      {/*<Select
        defaultValue={"default"}
        value={palette}
        onValueChange={(v) => setPalette(PALETTES[v])}
      >
        <SelectTrigger size="sm" aria-label="Choose color palette">
          <SelectValue placeholder="Palette" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(PALETTES).map((p) => (
            <SelectItem key={p} value={p}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>*/}
    </div>
  );
};

const ThemeControl = ({
  theme,
  setTheme,
  palette,
  setPalette,
  isMobile = false,
}: ThemeControlProps) => {
  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Palette className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <ThemeControlContent
            theme={theme}
            setTheme={setTheme}
            palette={palette}
            setPalette={setPalette}
            isMobile={isMobile}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <ThemeControlContent
      theme={theme}
      setTheme={setTheme}
      palette={palette}
      setPalette={setPalette}
      isMobile={isMobile}
    />
  );
};

export default ThemeControl;
