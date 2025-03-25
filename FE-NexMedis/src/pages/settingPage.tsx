import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Settings,
  Bell,
  Monitor,
  Moon,
  Sun,
  Shield,
  Lock,
  Smartphone,
  Languages,
  Volume2,
  MessageSquare,
  FileText,
  Tablet,
  Database,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Badge } from "@/components/ui/badge";

export default function SettingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // General settings state
  const [appearance, setAppearance] = useState("system");
  const [language, setLanguage] = useState("english");
  const [fontSize, setFontSize] = useState("medium");

  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [alertSounds, setAlertSounds] = useState(true);

  // Privacy settings state
  const [dataSharing, setDataSharing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [saveLoginInfo, setSaveLoginInfo] = useState(true);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  // Device settings state
  const [rememberDevices, setRememberDevices] = useState(true);
  const [devicesList, setDevicesList] = useState([
    { id: 1, name: "Chrome on Windows PC", lastUsed: "Today", current: true },
    { id: 2, name: "Safari on iPhone", lastUsed: "Yesterday", current: false },
    {
      id: 3,
      name: "Firefox on MacBook",
      lastUsed: "2 weeks ago",
      current: false,
    },
  ]);

  // Handle password change input
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  // Change password function
  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    setIsSubmitting(true);
    try {
      // This would be an API call in a real application
      // await axios.post("/api/change-password", passwordForm);

      // For demo, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsPasswordDialogOpen(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(
        "Failed to change password. Please check your current password and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Save all settings
  const saveSettings = async () => {
    setIsSubmitting(true);
    try {
      // This would be an API call in a real application
      // await axios.post("/api/settings", { appearance, language, fontSize, ... });

      // For demo, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Remove device
  const removeDevice = (deviceId: number) => {
    setDevicesList(devicesList.filter((device) => device.id !== deviceId));
    toast.success("Device removed successfully");
  };

  // Reset settings to default
  const resetSettings = async () => {
    setIsSubmitting(true);
    try {
      // This would be an API call in a real application
      // await axios.post("/api/settings/reset");

      // For demo, simulate API call and reset state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAppearance("system");
      setLanguage("english");
      setFontSize("medium");
      setEmailNotifications(true);
      setAppNotifications(true);
      setSmsNotifications(false);
      setAlertSounds(true);
      setDataSharing(false);
      setAnalytics(true);
      setSaveLoginInfo(true);
      setRememberDevices(true);

      toast.success("Settings reset to defaults");
    } catch (error) {
      console.error("Error resetting settings:", error);
      toast.error("Failed to reset settings. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-6xl space-y-6 p-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={resetSettings}
              disabled={isSubmitting}
            >
              Reset to Defaults
            </Button>
            <Button onClick={saveSettings} disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-4 md:flex md:w-auto">
            <TabsTrigger value="general" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Privacy & Security</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center">
              <Smartphone className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Devices</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage application appearance and basic settings
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="space-y-6 pt-6">
                {/* Appearance Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Appearance</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme Mode</Label>
                      <div className="flex gap-4">
                        <div
                          className={`flex flex-col items-center gap-2 border p-4 rounded-md cursor-pointer ${
                            appearance === "light"
                              ? "bg-primary/10 border-primary"
                              : ""
                          }`}
                          onClick={() => setAppearance("light")}
                        >
                          <Sun className="h-6 w-6" />
                          <span>Light</span>
                        </div>
                        <div
                          className={`flex flex-col items-center gap-2 border p-4 rounded-md cursor-pointer ${
                            appearance === "dark"
                              ? "bg-primary/10 border-primary"
                              : ""
                          }`}
                          onClick={() => setAppearance("dark")}
                        >
                          <Moon className="h-6 w-6" />
                          <span>Dark</span>
                        </div>
                        <div
                          className={`flex flex-col items-center gap-2 border p-4 rounded-md cursor-pointer ${
                            appearance === "system"
                              ? "bg-primary/10 border-primary"
                              : ""
                          }`}
                          onClick={() => setAppearance("system")}
                        >
                          <Monitor className="h-6 w-6" />
                          <span>System</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fontSize">Font Size</Label>
                      <Select
                        defaultValue={fontSize}
                        onValueChange={setFontSize}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Font Size</SelectLabel>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">
                              Medium (Default)
                            </SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                            <SelectItem value="x-large">Extra Large</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Language Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Language</h3>

                  <div className="space-y-2">
                    <Label htmlFor="language">Application Language</Label>
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4 text-muted-foreground" />
                      <Select
                        defaultValue={language}
                        onValueChange={setLanguage}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select Language</SelectLabel>
                            <SelectItem value="english">
                              English (US)
                            </SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="chinese">
                              Chinese (Simplified)
                            </SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Accessibility Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Accessibility</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          Screen Reader Support
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Optimize interface for screen readers
                        </p>
                      </div>
                      <Switch checked={true} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Reduce Motion</Label>
                        <p className="text-sm text-muted-foreground">
                          Minimize animations throughout the application
                        </p>
                      </div>
                      <Switch checked={false} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">High Contrast Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Increase contrast for better visibility
                        </p>
                      </div>
                      <Switch checked={false} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="space-y-6 pt-6">
                {/* Email Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>

                    {emailNotifications && (
                      <div className="ml-6 space-y-4 border-l pl-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Patient Updates</Label>
                            <p className="text-sm text-muted-foreground">
                              Notifications about patient changes
                            </p>
                          </div>
                          <Switch checked={true} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">System Updates</Label>
                            <p className="text-sm text-muted-foreground">
                              Maintenance and update notifications
                            </p>
                          </div>
                          <Switch checked={true} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-base">Marketing</Label>
                            <p className="text-sm text-muted-foreground">
                              Product news and updates
                            </p>
                          </div>
                          <Switch checked={false} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Application Notifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">App Notifications</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          In-App Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Show notifications within the application
                        </p>
                      </div>
                      <Switch
                        checked={appNotifications}
                        onCheckedChange={setAppNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive critical alerts via SMS
                        </p>
                      </div>
                      <Switch
                        checked={smsNotifications}
                        onCheckedChange={setSmsNotifications}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Alert Sounds</Label>
                        <p className="text-sm text-muted-foreground">
                          Play sounds for important notifications
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <HoverCard>
                          <HoverCardTrigger>
                            <Volume2 className="h-4 w-4 text-muted-foreground cursor-pointer" />
                          </HoverCardTrigger>
                          <HoverCardContent side="top">
                            <div className="text-sm">
                              Test notification sound
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        <Switch
                          checked={alertSounds}
                          onCheckedChange={setAlertSounds}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedules */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Do Not Disturb</h3>

                  <div className="space-y-2">
                    <Label>Quiet Hours</Label>
                    <div className="flex gap-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="start-time">Start Time</Label>
                        <Input
                          type="time"
                          id="start-time"
                          defaultValue="22:00"
                        />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="end-time">End Time</Label>
                        <Input type="time" id="end-time" defaultValue="07:00" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Only critical notifications will be displayed during quiet
                      hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy & Security Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>
                  Manage your security preferences and data privacy
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="space-y-6 pt-6">
                {/* Security Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Password</Label>
                        <p className="text-sm text-muted-foreground">
                          Last changed 30 days ago
                        </p>
                      </div>
                      <Dialog
                        open={isPasswordDialogOpen}
                        onOpenChange={setIsPasswordDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Lock className="h-4 w-4 mr-2" />
                            Change
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                              Enter your current password and a new strong
                              password
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={changePassword}>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="currentPassword">
                                  Current Password
                                </Label>
                                <Input
                                  id="currentPassword"
                                  name="currentPassword"
                                  type="password"
                                  value={passwordForm.currentPassword}
                                  onChange={handlePasswordChange}
                                  required
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="newPassword">
                                  New Password
                                </Label>
                                <Input
                                  id="newPassword"
                                  name="newPassword"
                                  type="password"
                                  value={passwordForm.newPassword}
                                  onChange={handlePasswordChange}
                                  required
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">
                                  Confirm New Password
                                </Label>
                                <Input
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  type="password"
                                  value={passwordForm.confirmPassword}
                                  onChange={handlePasswordChange}
                                  required
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsPasswordDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Update Password
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          Two-Factor Authentication
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4 mr-2" />
                        Setup
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">
                          Save Login Information
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Remember your login details for faster access
                        </p>
                      </div>
                      <Switch
                        checked={saveLoginInfo}
                        onCheckedChange={setSaveLoginInfo}
                      />
                    </div>
                  </div>
                </div>

                {/* Data Privacy */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Privacy</h3>

                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertTitle>Privacy Policy</AlertTitle>
                    <AlertDescription>
                      Our detailed privacy policy explains how we handle your
                      data.{" "}
                      <a
                        href="#"
                        className="font-medium underline underline-offset-4"
                      >
                        Read the full policy
                      </a>
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Data Sharing</Label>
                        <p className="text-sm text-muted-foreground">
                          Share anonymized data to improve our services
                        </p>
                      </div>
                      <Switch
                        checked={dataSharing}
                        onCheckedChange={setDataSharing}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Usage Analytics</Label>
                        <p className="text-sm text-muted-foreground">
                          Collect data on how you use the application
                        </p>
                      </div>
                      <Switch
                        checked={analytics}
                        onCheckedChange={setAnalytics}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="text-destructive hover:text-destructive"
                    >
                      Request Data Export
                    </Button>
                  </div>
                </div>

                {/* Session Management */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Management</h3>

                  <div className="space-y-2">
                    <Button variant="destructive">
                      Log Out From All Devices
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      This will end all active sessions except your current one
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Connected Devices</CardTitle>
                <CardDescription>
                  Manage devices that are connected to your account
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="space-y-6 pt-6">
                {/* Device Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Device Preferences</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">
                        Remember Trusted Devices
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Skip verification on devices you use regularly
                      </p>
                    </div>
                    <Switch
                      checked={rememberDevices}
                      onCheckedChange={setRememberDevices}
                    />
                  </div>
                </div>

                {/* Active Devices */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Active Devices</h3>
                  <p className="text-sm text-muted-foreground">
                    These devices have access to your account
                  </p>

                  <div className="space-y-4 mt-2">
                    {devicesList.map((device) => (
                      <div
                        key={device.id}
                        className="flex items-center justify-between border p-4 rounded-md"
                      >
                        <div className="flex items-start gap-3">
                          {device.current ? (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Tablet className="h-5 w-5" />
                            </div>
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                              <Smartphone className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{device.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <p>Last active: {device.lastUsed}</p>
                              {device.current && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 bg-primary/10 text-primary border-primary/20"
                                >
                                  Current
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {!device.current && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeDevice(device.id)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Device History */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Device History</h3>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="login-history">
                      <AccordionTrigger>Login History</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div className="text-sm">
                            <div className="flex justify-between py-2 border-b">
                              <div>Chrome on Windows PC</div>
                              <div className="text-muted-foreground">
                                Today, 09:42 AM
                              </div>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                              <div>Safari on iPhone</div>
                              <div className="text-muted-foreground">
                                Yesterday, 06:18 PM
                              </div>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                              <div>Chrome on Windows PC</div>
                              <div className="text-muted-foreground">
                                Mar 23, 2025, 11:30 AM
                              </div>
                            </div>
                            <div className="flex justify-between py-2">
                              <div>Firefox on MacBook</div>
                              <div className="text-muted-foreground">
                                Mar 20, 2025, 08:45 AM
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Complete History
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Advanced Settings */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="advanced">
            <AccordionTrigger>
              <div className="flex items-center">
                <Database className="mr-2 h-4 w-4" />
                Advanced Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Alert variant="destructive">
                      <MessageSquare className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        These settings are intended for advanced users. Changing
                        them incorrectly may affect system functionality.
                      </AlertDescription>
                    </Alert>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="api-endpoint">API Endpoint</Label>
                        <Input
                          id="api-endpoint"
                          defaultValue="https://api.nexmedis.com/v1"
                          readOnly
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cache-timeout">
                          Cache Timeout (minutes)
                        </Label>
                        <Input
                          id="cache-timeout"
                          type="number"
                          defaultValue="30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="data-retention">
                          Data Retention Period
                        </Label>
                        <Select defaultValue="90">
                          <SelectTrigger>
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">
                              90 days (Default)
                            </SelectItem>
                            <SelectItem value="180">180 days</SelectItem>
                            <SelectItem value="365">1 year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="debug-mode">Debug Mode</Label>
                        <div className="flex items-center space-x-2">
                          <Switch id="debug-mode" />
                          <Label htmlFor="debug-mode">
                            Enable debug logging
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 bg-muted/50">
                  <p className="text-xs text-muted-foreground">
                    System Version: 2.3.5 (Build 1089) • Last Updated: March 20,
                    2025
                  </p>
                </CardFooter>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
