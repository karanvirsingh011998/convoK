import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useTheme } from "../components/theme-provider";
import { Bell, Moon, Sun, Palette, Shield } from "lucide-react";

interface UserSettings {
  appearance: {
    theme: 'light' | 'dark' | 'system';
  };
  notifications: {
    messages: boolean;
    sounds: boolean;
    emailNotifs: boolean;
  };
  privacy: {
    onlineStatus: boolean;
    readReceipts: boolean;
    typing: boolean;
  };
}

const defaultSettings: UserSettings = {
  appearance: {
    theme: 'system',
  },
  notifications: {
    messages: true,
    sounds: true,
    emailNotifs: false,
  },
  privacy: {
    onlineStatus: true,
    readReceipts: true,
    typing: true,
  },
};

export function Settings() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = sessionStorage.getItem('userSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      setTheme(parsedSettings.appearance.theme);
    }
  }, [setTheme]);

  const updateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    sessionStorage.setItem('userSettings', JSON.stringify(newSettings));
    applySettings(newSettings);
  };

  const applySettings = (newSettings: UserSettings) => {
    setTheme(newSettings.appearance.theme);

    if (newSettings.notifications.sounds) {
      sessionStorage.setItem('notificationSounds', 'enabled');
    } else {
      sessionStorage.setItem('notificationSounds', 'disabled');
    }

    sessionStorage.setItem('privacySettings', JSON.stringify(newSettings.privacy));
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    const newSettings = {
      ...settings,
      appearance: { ...settings.appearance, theme: newTheme }
    };
    updateSettings(newSettings);
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="appearance" className="space-y-4">
            <TabsList>
              <TabsTrigger value="appearance" className="gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="gap-2">
                <Shield className="h-4 w-4" />
                Privacy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="flex gap-4">
                  {(['light', 'dark', 'system'] as const).map((themeOption) => (
                    <Button
                      key={themeOption}
                      variant={theme === themeOption ? "default" : "outline"}
                      size="icon"
                      onClick={() => handleThemeChange(themeOption)}
                    >
                      {themeOption === 'light' && <Sun className="h-4 w-4" />}
                      {themeOption === 'dark' && <Moon className="h-4 w-4" />}
                      {themeOption === 'system' && <Palette className="h-4 w-4" />}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Message Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for new messages
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.messages}
                    onCheckedChange={(checked) =>
                      updateSettings({
                        ...settings,
                        notifications: { ...settings.notifications, messages: checked }
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Sound Effects</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for new messages
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.sounds}
                    onCheckedChange={(checked) =>
                      updateSettings({
                        ...settings,
                        notifications: { ...settings.notifications, sounds: checked }
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications when offline
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifs}
                    onCheckedChange={(checked) =>
                      updateSettings({
                        ...settings,
                        notifications: { ...settings.notifications, emailNotifs: checked }
                      })
                    }
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Online Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Show when you're active
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.onlineStatus}
                    onCheckedChange={(checked) =>
                      updateSettings({
                        ...settings,
                        privacy: { ...settings.privacy, onlineStatus: checked }
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Read Receipts</Label>
                    <p className="text-sm text-muted-foreground">
                      Show when you've read messages
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.readReceipts}
                    onCheckedChange={(checked) =>
                      updateSettings({
                        ...settings,
                        privacy: { ...settings.privacy, readReceipts: checked }
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Typing Indicators</Label>
                    <p className="text-sm text-muted-foreground">
                      Show when you're typing
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.typing}
                    onCheckedChange={(checked) =>
                      updateSettings({
                        ...settings,
                        privacy: { ...settings.privacy, typing: checked }
                      })
                    }
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 