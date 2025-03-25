import { useState, useEffect } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Shield,
  Settings,
  Edit,
  LifeBuoy,
  UserCog,
  FileText,
  Lock,
  BellRing,
  Clock,
  Eye,
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

// Mock user data (would come from your API in a real app)
interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  phone: string;
  specialty: string;
  department: string;
  location: string;
  joinDate: string;
  bio: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch user profile data
  useEffect(() => {
    // Mock loading for demo
    const timer = setTimeout(() => {
      // This would be an API call in a real application
      setProfile({
        id: 1,
        name: "Dr. Jane Mitchell",
        email: "jane.mitchell@nexmedis.com",
        avatar: "https://reqres.in/img/faces/2-image.jpg",
        role: "Medical Doctor",
        phone: "+1 (555) 123-4567",
        specialty: "Cardiology",
        department: "Cardiac Care Unit",
        location: "Main Hospital, Floor 3",
        joinDate: "2023-05-15",
        bio: "Dr. Mitchell is a board-certified cardiologist with over 10 years of experience in treating heart-related conditions. She specializes in preventive cardiology and heart failure management.",
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditedProfile({});
    } else {
      setIsEditing(true);
      // Pre-fill form with current data
      setEditedProfile({
        name: profile?.name,
        email: profile?.email,
        phone: profile?.phone,
        specialty: profile?.specialty,
        department: profile?.department,
        location: profile?.location,
        bio: profile?.bio,
      });
    }
  };

  // Save profile changes
  const saveProfile = async () => {
    if (!profile) return;

    setIsSubmitting(true);
    try {
      // This would be an API call in a real application
      // await axios.put(`/api/users/${profile.id}`, editedProfile);

      // For demo, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state
      setProfile({
        ...profile,
        ...editedProfile,
      });

      setIsEditing(false);
      setEditedProfile({});
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Change password
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

  // Render avatar with fallback
  const renderAvatar = () => {
    if (isLoading) return <Skeleton className="h-24 w-24 rounded-full" />;

    return (
      <Avatar className="h-24 w-24">
        <AvatarImage src={profile?.avatar} alt={profile?.name} />
        <AvatarFallback>{profile?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
    );
  };

  // Render activity feed items
  const renderActivityItems = () => {
    const activities = [
      {
        id: 1,
        title: "Updated patient record #12345",
        time: "Today at 10:30 AM",
        icon: <FileText className="h-4 w-4" />,
      },
      {
        id: 2,
        title: "Completed security training",
        time: "Yesterday at 3:15 PM",
        icon: <Shield className="h-4 w-4" />,
      },
      {
        id: 3,
        title: "Changed password",
        time: "March 21, 2025",
        icon: <Lock className="h-4 w-4" />,
      },
      {
        id: 4,
        title: "Logged in from new device",
        time: "March 18, 2025",
        icon: <Eye className="h-4 w-4" />,
      },
    ];

    return activities.map((activity) => (
      <div key={activity.id} className="flex items-start space-x-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          {activity.icon}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">{activity.title}</p>
          <p className="text-xs text-muted-foreground">{activity.time}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-6xl space-y-6 p-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Activity</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="shadow-md">
              <CardHeader className="relative">
                <div className="absolute top-4 right-4">
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    size="sm"
                    onClick={toggleEditMode}
                  >
                    {isEditing ? (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  {renderAvatar()}
                  <div className="space-y-2 text-center sm:text-left">
                    {isLoading ? (
                      <>
                        <Skeleton className="h-7 w-40" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-5 w-28" />
                      </>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold">{profile?.name}</h2>
                        <p className="text-muted-foreground">
                          {profile?.email}
                        </p>
                        <Badge variant="outline" className="font-normal">
                          {profile?.role}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>

              <Separator />

              <CardContent className="pt-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Personal Information</h3>

                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={editedProfile.name || ""}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={editedProfile.email || ""}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={editedProfile.phone || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          {isLoading ? (
                            <Skeleton className="h-4 w-48" />
                          ) : (
                            profile?.email
                          )}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          {isLoading ? (
                            <Skeleton className="h-4 w-32" />
                          ) : (
                            profile?.phone
                          )}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          {isLoading ? (
                            <Skeleton className="h-4 w-40" />
                          ) : (
                            profile?.location
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Professional Details</h3>

                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="specialty">Specialty</Label>
                          <Input
                            id="specialty"
                            name="specialty"
                            value={editedProfile.specialty || ""}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            name="department"
                            value={editedProfile.department || ""}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={editedProfile.location || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                          {isLoading ? (
                            <Skeleton className="h-4 w-36" />
                          ) : (
                            profile?.specialty
                          )}
                        </div>
                        <div className="flex items-center">
                          <UserCog className="h-4 w-4 mr-2 text-muted-foreground" />
                          {isLoading ? (
                            <Skeleton className="h-4 w-44" />
                          ) : (
                            profile?.department
                          )}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {isLoading ? (
                            <Skeleton className="h-4 w-32" />
                          ) : (
                            <>
                              Joined:{" "}
                              {new Date(
                                profile?.joinDate || ""
                              ).toLocaleDateString()}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold">About</h3>

                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={editedProfile.bio || ""}
                        onChange={handleChange}
                        className="w-full min-h-[100px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      />
                    </div>
                  ) : (
                    <div>
                      {isLoading ? (
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      ) : (
                        <p className="text-muted-foreground">{profile?.bio}</p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>

              {isEditing && (
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={toggleEditMode}>
                    Cancel
                  </Button>
                  <Button onClick={saveProfile} disabled={isSubmitting}>
                    {isSubmitting && (
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                    )}
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  A history of your recent actions and system events
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="space-y-1">{renderActivityItems()}</div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline" size="sm">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and security settings
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Security</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <div className="font-medium">Password</div>
                          <div className="text-sm text-muted-foreground">
                            Last changed 30 days ago
                          </div>
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
                                Enter your current password and new password to
                                update
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
                                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                                  )}
                                  Update Password
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <div className="font-medium">
                            Two-Factor Authentication
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Enhance your account security
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Shield className="h-4 w-4 mr-2" />
                          Enable
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <div className="font-medium">Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Manage your notification settings
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <BellRing className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <div className="font-medium">Help & Support</div>
                          <div className="text-sm text-muted-foreground">
                            Get assistance with your account
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <LifeBuoy className="h-4 w-4 mr-2" />
                          Support
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
