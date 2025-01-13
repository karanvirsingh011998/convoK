import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Button } from "./ui/button";
import { Smile } from "lucide-react";
import { useTheme } from "./theme-provider";

interface EmojiPickerProps {
  onChange: (emoji: string) => void;
}

export function EmojiPicker({ onChange }: EmojiPickerProps) {
  const { theme } = useTheme();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Smile className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 border-none">
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          theme={theme}
          set="native"
        />
      </PopoverContent>
    </Popover>
  );
} 