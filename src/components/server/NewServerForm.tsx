import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { ChevronLeftIcon, Loader2, MoveRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { Slider } from '@/components/ui/slider.tsx'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(1).max(255),
  enableDataLossNotification: z.boolean(),
  dataLossNotificationConfig: z.object({
    missedIntervalThreshold: z.coerce.number().int().min(1).max(120),
    performAdditionalPingCheck: z.boolean(),
  }),
  enableResourceUsageNotification: z.boolean(),
  resourceUsageNotificationConfig: z.object({
    systemLoadThreshold: z.coerce.number().int().min(1).max(100),
    memoryUsageThreshold: z.coerce.number().int().min(1).max(100),
    diskUsageThreshold: z.coerce.number().int().min(1).max(100),
  }),
})

type Props = {
  onCreateServer: (data: { id: string; token: string }) => void
}

export function NewServerForm({ onCreateServer }: Props) {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      enableDataLossNotification: true,
      dataLossNotificationConfig: {
        missedIntervalThreshold: 1,
        performAdditionalPingCheck: true,
      },
      enableResourceUsageNotification: true,
      resourceUsageNotificationConfig: {
        systemLoadThreshold: 80,
        memoryUsageThreshold: 80,
        diskUsageThreshold: 80,
      },
    },
  })

  const { mutate: createServer, isPending: isCreatingServer } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      console.log(JSON.stringify(data, null, 2))
      // FIXME: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return { id: 'mock_server_id', token: 'mock_token-mock_token-mock_token' }
    },
    onSuccess: (data) => {
      onCreateServer(data)
      toast.success('Server created')
    },
    onError: (error) => {
      toast.error('Server creation failed', { description: error.message })
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createServer(data)
  }

  return (
    <div className="flex flex-col justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mx-auto max-w-[600px]">
            <CardHeader>
              <CardTitle className="mx-auto">New Server</CardTitle>
              <CardDescription />
            </CardHeader>
            <Separator />
            <CardContent className="mt-4">
              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <FormLabel>Name</FormLabel>
                        <FormDescription>
                          Preferably the server's hostname or FQDN
                        </FormDescription>
                      </div>

                      <FormControl>
                        <Input
                          autoComplete="name"
                          className="text-base"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="enableDataLossNotification"
                    render={({
                      field: {
                        value: checked,
                        onChange: onCheckedChange,
                        ...restProps
                      },
                    }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel>Data Loss Notification</FormLabel>
                          <FormControl className="order-first">
                            <Checkbox
                              checked={checked}
                              onCheckedChange={onCheckedChange}
                              {...restProps}
                            />
                          </FormControl>
                        </div>

                        <FormDescription className="sr-only">
                          Receive notifications when data loss is detected
                        </FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-6 rounded-md border bg-gray-100 p-4">
                    <FormField
                      control={form.control}
                      name="dataLossNotificationConfig.missedIntervalThreshold"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex flex-wrap items-center gap-y-2">
                            Send alert after
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                max={120}
                                step={1}
                                className="-my-1 mx-2 h-8 w-16 bg-white text-center text-base"
                                {...field}
                              />
                            </FormControl>
                            missed data interval
                            <MoveRightIcon className="mx-2 size-4" />
                            {field.value * 3} minutes
                          </FormLabel>

                          <FormDescription className="sr-only">
                            The number of missed intervals before a notification
                            is sent
                          </FormDescription>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dataLossNotificationConfig.performAdditionalPingCheck"
                      render={({
                        field: {
                          value: checked,
                          onChange: onCheckedChange,
                          ...restProps
                        },
                      }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormLabel className="leading-tight">
                              Perform additional ping check to confirm the
                              server is down
                            </FormLabel>
                            <FormControl className="order-first">
                              <Checkbox
                                checked={checked}
                                onCheckedChange={onCheckedChange}
                                {...restProps}
                              />
                            </FormControl>
                          </div>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="enableResourceUsageNotification"
                    render={({
                      field: {
                        value: checked,
                        onChange: onCheckedChange,
                        ...restProps
                      },
                    }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <FormLabel>Resource Usage Notification</FormLabel>
                          <FormControl className="order-first">
                            <Checkbox
                              checked={checked}
                              onCheckedChange={onCheckedChange}
                              {...restProps}
                            />
                          </FormControl>
                        </div>

                        <FormDescription className="sr-only">
                          Receive notifications when resource usage is high
                        </FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-4 rounded-md border bg-gray-100 p-4">
                    <FormField
                      control={form.control}
                      name="resourceUsageNotificationConfig.systemLoadThreshold"
                      render={({ field }) => (
                        <ResourceUsageNotificationFormItem field={field} />
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="resourceUsageNotificationConfig.memoryUsageThreshold"
                      render={({ field }) => (
                        <ResourceUsageNotificationFormItem field={field} />
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="resourceUsageNotificationConfig.diskUsageThreshold"
                      render={({ field }) => (
                        <ResourceUsageNotificationFormItem field={field} />
                      )}
                    />

                    <div className="mt-2 text-sm text-slate-500">
                      Settings a value to zero will disable the resource usage
                      alert for its type
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" variant="brand" disabled={isCreatingServer}>
                {isCreatingServer && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                {isCreatingServer ? 'Creating Server...' : 'Create Server'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Button
        className="mx-auto mt-8 w-full max-w-[600px] bg-brand-background-700 text-slate-300 hover:bg-brand-background-600"
        onClick={() => navigate('/servers')}
      >
        <ChevronLeftIcon className="mr-2 size-4" />I don't want to create a new
        server
      </Button>
    </div>
  )
}

type ResourceCategoryName =
  | 'resourceUsageNotificationConfig.systemLoadThreshold'
  | 'resourceUsageNotificationConfig.memoryUsageThreshold'
  | 'resourceUsageNotificationConfig.diskUsageThreshold'

type ResourceFormFieldInfo = {
  title: string
  label: string
  description: string
}

function resourceFormFieldInfo(
  name: ResourceCategoryName,
): ResourceFormFieldInfo {
  switch (name) {
    case 'resourceUsageNotificationConfig.systemLoadThreshold':
      return {
        title: 'System Load',
        label: 'System Load Threshold',
        description:
          'The system load threshold at which a notification is sent',
      }
    case 'resourceUsageNotificationConfig.memoryUsageThreshold':
      return {
        title: 'RAM Usage',
        label: 'Memory Usage Threshold',
        description:
          'The memory usage threshold at which a notification is sent',
      }
    case 'resourceUsageNotificationConfig.diskUsageThreshold':
      return {
        title: 'Disk Usage',
        label: 'Disk Usage Threshold',
        description: 'The disk usage threshold at which a notification is sent',
      }
  }
}

function ResourceUsageNotificationFormItem<TName extends ResourceCategoryName>({
  field,
}: {
  field: ControllerRenderProps<z.infer<typeof formSchema>, TName>
}) {
  const { value, onChange, ...restProps } = field
  const sliderValue = [value]
  const onSliderValueChange = (values: number[]) => onChange(values[0])
  const { title, label, description } = resourceFormFieldInfo(field.name)
  return (
    <FormItem>
      <FormLabel className="sr-only">{label}</FormLabel>

      <FormDescription className="sr-only">{description}</FormDescription>

      <div className="flex items-center space-x-2">
        <div className="flex h-8 w-[6.5rem] flex-shrink-0 items-center justify-center rounded-sm bg-slate-200 px-2 text-sm font-medium">
          {title}
        </div>
        <div>is</div>
        <Slider
          value={sliderValue}
          onValueChange={onSliderValueChange}
          className="hidden sm:flex"
          trackClassName="bg-white outline outline-slate-200"
          {...restProps}
        />
        <div className="flex flex-shrink-0 items-center gap-2">
          <FormControl>
            <Input
              type="number"
              min={1}
              max={100}
              step={1}
              className="h-8 w-16 text-center text-base"
              {...field}
            />
          </FormControl>
          % or higher
        </div>
      </div>

      <FormMessage />
    </FormItem>
  )
}
