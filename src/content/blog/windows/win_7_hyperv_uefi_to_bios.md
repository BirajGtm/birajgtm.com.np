---

## title: "How to Run Windows 7 on Hyper-V from a Modern UEFI System" description: "A complete guide to converting a Windows 7 installation from UEFI/GPT to BIOS/MBR so it can successfully boot inside a Hyper-V Generation 1 virtual machine." pubDate: "Mar 30 2026" tags: ["Windows 7", "Hyper-V", "Virtualization", "Sysadmin"]

Running Windows 7 on modern hardware inside Hyper-V isn’t as straightforward as it should be. If you’ve tried the usual physical-to-virtual (P2V) methods, you’ve likely hit a frustrating dead end.

## The Core Problem

Modern systems use **UEFI with GPT**, while Hyper-V presents two incompatible options:

- **Generation 1 VM** → Supports *Legacy BIOS only* (no UEFI)
- **Generation 2 VM** → Supports UEFI, but **Windows 7 lacks proper Class 3 UEFI graphics support**

The result? A system that either **won’t boot at all** or hangs at **“Starting Windows.”**

> The root issue is not the OS itself, but the mismatch between firmware expectations and disk partitioning.

## The Working Solution

The only reliable workaround is:

1. Convert the disk from **GPT → MBR**
2. Rebuild the bootloader for **Legacy BIOS**
3. Run the VM as **Generation 1**

This guide walks through the exact process.

---

## Phase 1: Capture the Disk (Disk2vhd)

First, create a virtual copy of your physical machine.

### Steps:

- Download and run **Disk2vhd (Sysinternals)**
- Select:
  - Your **C: drive**
  - Any **System Reserved / EFI partitions**
- Keep **Use VSS** enabled (recommended)
- Optional: Uncheck **Use VHDX** for maximum compatibility

Click **Create** to generate the virtual disk.

### Notes:

- VSS ensures a consistent snapshot
- Capturing EFI is important (we’ll remove it later)

---

## Phase 2: Convert GPT to MBR (DiskGenius)

Now we adapt the disk for BIOS compatibility.

### Steps:

1. **Mount the VHD/VHDX**
2. Open **DiskGenius**
3. Select the virtual disk
4. Right-click the disk → **Convert to MBR Partition Table**
5. Click **Save All**

### Clean Up Partitions:

- Delete:
  - EFI partition (\~100MB)
  - MSR partition (\~16MB)
- Keep only:
  - Main Windows partition

### Mark Active:

Right-click the Windows partition → **Mark as Active**

> In BIOS systems, the "Active" flag tells the machine where to boot from.

Finally, click **Save All** and unmount the disk.

---

## Phase 3: Rebuild the Bootloader

Now we rebuild Windows boot files for BIOS.

### Setup:

- Create a **Generation 1 VM**
- Attach VHD/VHDX to **IDE Controller 0**
- Boot using a **Windows 7 or Windows 10 ISO**
- Press **Shift + F10** to open Command Prompt

### Step 1: Verify Disk

```
diskpart
list disk
select disk 0
list partition
select partition 1
active
exit
```

### Step 2: Rebuild Bootloader

```
:: Update MBR boot code
bootsect /nt60 C: /mbr /force

:: Rebuild boot files
bcdboot C:\Windows /s C: /f BIOS
```

### Important Note:

- If `/f BIOS` fails (on older ISOs), run:

  bcdboot C:\Windows /s C:

---

## Phase 4: Fix 0x7B BSOD (Optional)

If Windows crashes with **INACCESSIBLE\_BOOT\_DEVICE (0x7B)**, it’s a driver issue.

### Cause:

Your physical system used modern storage drivers (e.g., NVMe), but Hyper-V uses IDE.

### Fix:

```
reg load HKLM\OFFLINE C:\Windows\System32\config\SYSTEM

reg add HKLM\OFFLINE\ControlSet001\Services\atapi /v Start /t REG_DWORD /d 0 /f
reg add HKLM\OFFLINE\ControlSet001\Services\intelide /v Start /t REG_DWORD /d 0 /f
reg add HKLM\OFFLINE\ControlSet001\Services\pciide /v Start /t REG_DWORD /d 0 /f

reg unload HKLM\OFFLINE
```

---

## Final VM Configuration Checklist

Before booting, confirm:

- **Generation**: 1
- **Disk**: Attached to IDE Controller 0
- **DVD Drive**: Remove after repair
- **Network**: Use **Legacy Network Adapter** if needed

---

## Conclusion

Virtualizing Windows 7 from a modern machine isn’t broken—it’s just mismatched.

By converting:

- **GPT → MBR**
- **UEFI → BIOS bootloader**

…you align the system with what Hyper-V Generation 1 actually expects.

Once done correctly, the VM boots reliably and behaves just like a native legacy system.

> Sometimes the solution isn’t upgrading forward—it’s adapting backward."

```
```
