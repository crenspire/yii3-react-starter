import * as React from "react"
import {
  IconArrowsSort,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCopy,
  IconDotsVertical,
  IconLayoutColumns,
  IconPencil,
  IconPlus,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
  IconTrash,
} from "@tabler/icons-react"
import {
  columnVisibilityFeature,
  createColumnHelper,
  createPaginatedRowModel,
  createSortedRowModel,
  FlexRender,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"
import { toast } from "sonner"

import { DeleteUsersDialog } from "@/components/admin/delete-users-dialog"
import { formatDate, StatusBadge } from "@/components/admin/status-badge"
import { UserAvatar } from "@/components/admin/user-avatar"
import { UserSheet } from "@/components/admin/user-sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const features = tableFeatures({
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
})

const columnHelper = createColumnHelper()

const byText = (key) => (rowA, rowB) => rowA.original[key].localeCompare(rowB.original[key])

function SortableHeader({ column, children, className }) {
  const sorted = column.getIsSorted()
  const Icon = sorted === "asc" ? IconSortAscending : sorted === "desc" ? IconSortDescending : IconArrowsSort

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`-ml-2.5 h-8 data-[sorted=false]:text-muted-foreground ${className ?? ""}`}
      data-sorted={!!sorted}
      onClick={column.getToggleSortingHandler()}
    >
      {children}
      <Icon className="size-3.5" />
    </Button>
  )
}

function buildColumns({ onEdit, onDelete }) {
  return columnHelper.columns([
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={`Select ${row.original.name}`}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("name", {
      header: ({ column }) => <SortableHeader column={column}>User</SortableHeader>,
      sortFn: byText("name"),
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() => onEdit(row.original)}
          className="flex items-center gap-3 rounded-md text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <UserAvatar name={row.original.name} seed={row.original.email} />
          <div className="grid leading-tight">
            <span className="font-medium hover:underline">{row.original.name}</span>
            <span className="text-xs text-muted-foreground">{row.original.email}</span>
          </div>
        </button>
      ),
      enableHiding: false,
    }),
    columnHelper.accessor("role", {
      header: ({ column }) => <SortableHeader column={column}>Role</SortableHeader>,
      sortFn: byText("role"),
      cell: ({ row }) => (
        <Badge variant={row.original.role === "Admin" ? "secondary" : "outline"} className="px-1.5">
          {row.original.role}
        </Badge>
      ),
    }),
    columnHelper.accessor("status", {
      header: ({ column }) => <SortableHeader column={column}>Status</SortableHeader>,
      sortFn: byText("status"),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    }),
    columnHelper.accessor("createdAt", {
      id: "joined",
      header: ({ column }) => <SortableHeader column={column}>Joined</SortableHeader>,
      sortFn: byText("createdAt"),
      cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{formatDate(row.original.createdAt)}</span>,
    }),
    columnHelper.display({
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onSelect={() => onEdit(row.original)}>
              <IconPencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() =>
                navigator.clipboard
                  .writeText(row.original.email)
                  .then(() => toast.success("Email copied to clipboard."))
                  .catch(() => toast.error("Could not copy the email."))
              }
            >
              <IconCopy />
              Copy email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={() => onDelete([row.original])}>
              <IconTrash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
  ])
}

export function UsersTable({ users, roles, statuses, startWithCreate = false }) {
  const [status, setStatus] = React.useState("all")
  const [search, setSearch] = React.useState("")
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [sorting, setSorting] = React.useState([])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const [sheet, setSheet] = React.useState({ open: startWithCreate, user: null })
  const [toDelete, setToDelete] = React.useState([])

  const counts = React.useMemo(
    () => Object.fromEntries(statuses.map((value) => [value, users.filter((user) => user.status === value).length])),
    [users, statuses],
  )

  const data = React.useMemo(() => {
    const query = search.trim().toLowerCase()
    return users.filter(
      (user) =>
        (status === "all" || user.status === status) &&
        (query === "" || user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)),
    )
  }, [users, status, search])

  const columns = React.useMemo(
    () =>
      buildColumns({
        onEdit: (user) => setSheet({ open: true, user }),
        onDelete: setToDelete,
      }),
    [],
  )

  const table = useTable({
    features,
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, pagination },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  })

  // Go back to the first page and drop selections that are no longer visible when the filters change.
  React.useEffect(() => {
    setPagination((current) => ({ ...current, pageIndex: 0 }))
    setRowSelection({})
  }, [status, search])

  // Keep the page index valid after deleting users on the last page.
  React.useEffect(() => {
    const pageCount = Math.max(1, Math.ceil(data.length / pagination.pageSize))
    if (pagination.pageIndex >= pageCount) {
      setPagination((current) => ({ ...current, pageIndex: pageCount - 1 }))
    }
  }, [data.length, pagination.pageIndex, pagination.pageSize])

  const selectedUsers = users.filter((user) => rowSelection[user.id])

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-4 px-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <Tabs value={status} onValueChange={setStatus}>
          <TabsList className="**:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1">
            <TabsTrigger value="all">
              All <Badge variant="secondary">{users.length}</Badge>
            </TabsTrigger>
            {statuses.map((value) => (
              <TabsTrigger key={value} value={value}>
                {value} <Badge variant="secondary">{counts[value]}</Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <IconSearch className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search users..."
              className="h-8 w-full pl-8 sm:w-56"
              aria-label="Search users"
            />
          </div>
          {selectedUsers.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => setToDelete(selectedUsers)}>
              <IconTrash />
              Delete ({selectedUsers.length})
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" onClick={() => setSheet({ open: true, user: null })}>
            <IconPlus />
            <span>Add user</span>
          </Button>
        </div>
      </div>

      <div className="px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : <FlexRender header={header} />}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        <FlexRender cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
          {selectedUsers.length} of {data.length} row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select value={`${pagination.pageSize}`} onValueChange={(value) => table.setPageSize(Number(value))}>
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue placeholder={pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {pagination.pageIndex + 1} of {Math.max(1, table.getPageCount())}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>

      <UserSheet
        open={sheet.open}
        user={sheet.user}
        roles={roles}
        statuses={statuses}
        onOpenChange={(open) => setSheet((current) => ({ ...current, open }))}
      />
      <DeleteUsersDialog
        users={toDelete}
        onOpenChange={(open) => !open && setToDelete([])}
        onDeleted={() => setRowSelection({})}
      />
    </div>
  )
}
